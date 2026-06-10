const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '3005'

module.exports = {
  apps: [
    {
      name: 'esnt-frontend-doc-ferreteria',
      script: process.execPath,
      args: 'scripts/run-next.mjs start',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: host,
        PORT: port,
        PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL || 'http://163.245.192.54:3005',
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://163.245.192.54:3000',
      },
    },
  ],
}
