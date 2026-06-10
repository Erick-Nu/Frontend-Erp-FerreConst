import { spawn } from 'node:child_process'
import path from 'node:path'

const mode = process.argv[2]

if (mode !== 'dev' && mode !== 'start') {
  console.error('Usage: node scripts/run-next.mjs <dev|start>')
  process.exit(1)
}

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ?? '3005'
const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next')
const extraArgs = process.argv.slice(3)

const child = spawn(process.execPath, [nextBin, mode, '-H', host, '-p', port, ...extraArgs], {
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
