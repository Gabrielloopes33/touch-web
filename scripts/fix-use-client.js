const fs = require("fs");
const path = require("path");
const glob = require("glob");

const root = path.resolve(__dirname, "..");

const files = glob.sync(`${root}/**/*.tsx`, {
  ignore: ["**/node_modules/**", "**/.next/**"],
});

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;
  let modified = false;

  const usesHook = /use(State|Effect|Ref|Memo|Callback|Reducer|LayoutEffect)/.test(content);
  const hasUseClient = /["']use client["']/.test(content);
  const lines = content.split("\n");

  if (usesHook) {
    const cleanedLines = lines.filter(
      line => !line.trim().startsWith('"use client"') && !line.trim().startsWith("'use client'")
    );
    cleanedLines.unshift('"use client";');
    content = cleanedLines.join("\n");
    modified = true;
  }

  if (modified && content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Corrigido: ${path.relative(root, filePath)}`);
  }
});
