const fs = require("fs");
const path = require("path");
const glob = require("glob");

const root = path.resolve(__dirname, "..");

const files = glob.sync(`${root}/**/*.tsx`, {
  ignore: ["**/node_modules/**", "**/.next/**"]
});

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;
  let modified = false;

  // Verifica se há fragmento mal formado
  const fragmentWithNoWrap = /return\s+<>\s*\n/.test(content);
  const hasJSX = /return\s*\(\s*<\s*/.test(content);
  const hasReact = /import\s+React\s+from\s+["']react["']/.test(content);

  // Corrigir retorno direto de fragmentos mal fechados
  if (fragmentWithNoWrap) {
    content = content.replace(/return\s+<>\s*\n/, "return (\n  <>\n");
    content = content.replace(/<\/>\s*;\s*$/, "</>\n);");
    modified = true;
  }

  // Adiciona import React se necessário
  if (hasJSX && !hasReact) {
    content = `import React from "react";\n${content}`;
    modified = true;
  }

  if (modified && content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Corrigido fragmento JSX: ${path.relative(root, filePath)}`);
  }
});
