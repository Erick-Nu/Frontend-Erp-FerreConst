'use client'

import { useState } from 'react'
import { getApiBaseUrl } from '@/config/public-env'

const languages = ['TypeScript', 'Java', 'Python'] as const
const apiBaseUrl = getApiBaseUrl()

const codeExamples: Record<string, string> = {
  TypeScript: `import { fetch } from 'node-fetch';

const API = '${apiBaseUrl}';

async function login() {
  const res = await fetch(\`\${API}/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emruc: '1709639106001',
      usapodo: 'jperez',
      uspassword: 'secreto123',
    }),
  });

  const data = await res.json();
  const token = data.accessToken;

  const branches = await fetch(\`\${API}/branches?page=1&pageSize=10\`, {
    headers: { Authorization: \`Bearer \${token}\` },
  });

  console.log(await branches.json());
}`,

  Java: `import java.net.http.*;
import java.net.URI;
import java.net.http.HttpRequest.BodyPublishers;

public class ApiClient {

  static final String API = "${apiBaseUrl}";

  public static void main(String[] args) throws Exception {
    var client = HttpClient.newHttpClient();

    String json = """
      { "emruc": "1709639106001",
        "usapodo": "jperez",
        "uspassword": "secreto123" }
      """;

    var loginReq = HttpRequest.newBuilder()
      .uri(URI.create(API + "/auth/login"))
      .header("Content-Type", "application/json")
      .POST(BodyPublishers.ofString(json))
      .build();

    var loginRes = client.send(loginReq,
      HttpResponse.BodyHandlers.ofString());

    var body = loginRes.body();
    int start = body.indexOf("accessToken") + 14;
    int end = body.indexOf("\\\"", start + 1);
    var token = body.substring(start + 1, end);

    var branchesReq = HttpRequest.newBuilder()
      .uri(URI.create(API + "/branches?page=1&pageSize=10"))
      .header("Authorization", "Bearer " + token)
      .GET()
      .build();

    var branchesRes = client.send(branchesReq,
      HttpResponse.BodyHandlers.ofString());

    System.out.println(branchesRes.body());
  }
}`,

  Python: `import requests

API = "${apiBaseUrl}"

res = requests.post(f"{API}/auth/login", json={
    "emruc": "1709639106001",
    "usapodo": "jperez",
    "uspassword": "secreto123",
})

data = res.json()
token = data["accessToken"]

branches = requests.get(
    f"{API}/branches?page=1&pageSize=10",
    headers={"Authorization": f"Bearer {token}"},
)

print(branches.json())`,
}

export default function LangTabs() {
  const [active, setActive] = useState<string>('TypeScript')

  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-app-border bg-app-elevated">
      <div className="grid grid-cols-3 border-b border-app-border">
        {languages.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActive(lang)}
            className={`min-h-11 px-3 py-3 text-center text-sm font-bold transition sm:px-5 ${
              active === lang
                ? 'border-b border-app-text bg-app-code text-app-text'
                : 'text-app-text-muted hover:text-app-text-secondary'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      <pre className="code-scroll overflow-auto bg-app-code p-4 text-[13px] leading-6 sm:p-5">
        <code>
          <HighlightedCode code={codeExamples[active]} language={active} />
        </code>
      </pre>
    </div>
  )
}

function HighlightedCode({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n')
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block min-w-max">
          {renderLine(line, language)}
        </span>
      ))}
    </>
  )
}

function renderLine(line: string, language: string) {
  if (language === 'Python') return renderPythonLine(line)
  if (language === 'Java') return renderJavaLine(line)
  return renderTypeScriptLine(line)
}

function renderTypeScriptLine(line: string) {
  const tokens = tokenize(line, tsRules)
  return renderTokens(tokens)
}

function renderJavaLine(line: string) {
  const tokens = tokenize(line, javaRules)
  return renderTokens(tokens)
}

function renderPythonLine(line: string) {
  const tokens = tokenize(line, pythonRules)
  return renderTokens(tokens)
}

type Token = { text: string; color: string }

function renderTokens(tokens: Token[]) {
  return tokens.map((t, i) => (
    <span key={i} className={t.color}>
      {t.text}
    </span>
  ))
}

type Rule = { match: RegExp; color: string; priority?: number }

const tsRules: Rule[] = [
  { match: /\/\/.*$/, color: 'text-[var(--syn-comment)]' },
  { match: /\b(import|from|async|await|const|let|var|function|return|if|else|try|catch|throw|new|class|export|default)\b/, color: 'text-[var(--syn-keyword)]' },
  { match: /\b(string|number|boolean|void|any|Promise|Response|Json)\b/, color: 'text-[var(--syn-type)]' },
  { match: /`[^`]*`/, color: 'text-[var(--syn-string)]' },
  { match: /'[^']*'/, color: 'text-[var(--syn-string)]' },
  { match: /"[^"]*"/, color: 'text-[var(--syn-string)]' },
  { match: /\b(\d+\.?\d*)\b/, color: 'text-[var(--syn-number)]' },
  { match: /\$\{[^}]+\}/, color: 'text-[var(--syn-string)]' },
  { match: /(\w+)(?=\s*\()/, color: 'text-[var(--syn-function)]' },
]

const javaRules: Rule[] = [
  { match: /\/\/.*$/, color: 'text-[var(--syn-comment)]' },
  { match: /\/\*[\s\S]*?\*\//, color: 'text-[var(--syn-comment)]' },
  { match: /\b(import|class|public|private|static|void|var|new|return|try|catch|throw|throws|final|String|int|double|boolean)\b/, color: 'text-[var(--syn-keyword)]' },
  { match: /\b(HttpClient|HttpRequest|HttpResponse|URI|Builder|BodyPublishers|BodyHandlers)\b/, color: 'text-[var(--syn-type)]' },
  { match: /@\w+/, color: 'text-[var(--syn-comment)]' },
  { match: /'[^']*'/, color: 'text-[var(--syn-string)]' },
  { match: /"[^"]*"/, color: 'text-[var(--syn-string)]' },
  { match: /\b(\d+\.?\d*)\b/, color: 'text-[var(--syn-number)]' },
]

const pythonRules: Rule[] = [
  { match: /#.*$/, color: 'text-[var(--syn-comment)]' },
  { match: /'''[\s\S]*?'''/, color: 'text-[var(--syn-comment)]' },
  { match: /\b(import|from|def|class|return|if|elif|else|for|while|try|except|with|as|print|async|await|in|not|and|or|True|False|None)\b/, color: 'text-[var(--syn-keyword)]' },
  { match: /@\w+/, color: 'text-[var(--syn-function)]' },
  { match: /\b(requests|json|response|get|post)\b/, color: 'text-[var(--syn-type)]' },
  { match: /'[^']*'/, color: 'text-[var(--syn-string)]' },
  { match: /"[^"]*"/, color: 'text-[var(--syn-string)]' },
  { match: /\b(\d+\.?\d*)\b/, color: 'text-[var(--syn-number)]' },
  { match: /\bf(["'])/, color: 'text-[var(--syn-string)]' },
]

function tokenize(line: string, rules: Rule[]): Token[] {
  if (!line.trim()) return [{ text: ' ', color: 'text-[var(--syn-default)]' }]
  
  const tokens: Token[] = []
  let remaining = line

  const sorted = [...rules].sort((a, b) => (b.priority || 0) - (a.priority || 0))

  while (remaining.length > 0) {
    let matched = false
    for (const rule of sorted) {
      const match = remaining.match(rule.match)
      if (match && match.index === 0) {
        tokens.push({ text: match[0], color: rule.color })
        remaining = remaining.slice(match[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], color: 'text-[var(--syn-default)]' })
      remaining = remaining.slice(1)
    }
  }

  return tokens
}
