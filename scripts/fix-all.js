const fs = require("fs");
const path = require("path");
const glob = require("glob");

const root = path.resolve(__dirname, "..");

const files = glob.sync(`${root}/**/*.tsx`, {
  ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"]
});

console.log("📄 Iniciando varredura em arquivos .tsx");

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;
  let modified = false;
  const logs = [];

  // 1. Corrige fragmentos JSX soltos mal abertos
  content = content.replace(/return\s+<>\s*\n/, "return (\n  <>\n");
  content = content.replace(/<\/>\s*;/g, "  </>\n);");
  if (content !== original) {
    logs.push("🛠️ Corrigido fragmento JSX com parênteses de return");
    modified = true;
  }

  // 2. Garante que 'return <' seja 'return ('
  content = content.replace(/return\s+</g, "return ( <");
  if (content !== original) {
    logs.push("🪛 Corrigido return < para return (<");
    modified = true;
  }

  // 3. Corrige JSX sem fechamento correto do parênteses
  const lines = content.split("\n");
  const newLines = [];
  let insideReturnBlock = false;
  for (let line of lines) {
    if (/return\s*\(\s*$/.test(line)) {
      insideReturnBlock = true;
    }
    newLines.push(line);
    if (insideReturnBlock && line.includes("</>")) {
      newLines.push(")");
      insideReturnBlock = false;
    }
  }
  content = newLines.join("\n");

  // 4. Adiciona React se necessário
  const hasJSX = /return\s*\(?\s*<\s*/.test(content);
  const hasReact = /import\s+React\s+from\s+["']react["']/.test(content);
  if (hasJSX && !hasReact) {
    content = `import React from "react";\n${content}`;
    logs.push("➕ Adicionado import React");
    modified = true;
  }

  // 5. Adiciona "use client" no topo se usar hooks
  const usesHook = /use(State|Effect|Ref|Memo|Callback|Reducer|LayoutEffect)/.test(content);
  if (usesHook && !content.includes('"use client"')) {
    const clean = content.split("\n").filter(l => !l.trim().startsWith('"use client"') && !l.trim().startsWith("'use client'"));
    clean.unshift('"use client";');
    content = clean.join("\n");
    logs.push('➕ Adicionado "use client" no topo');
    modified = true;
  }

  if (modified && content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ ${path.relative(root, filePath)}`);
    logs.forEach(log => console.log("   ", log));
  }
});
