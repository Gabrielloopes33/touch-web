const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");

const files = glob.sync(`${projectRoot}/**/*.{tsx,jsx}`, {
  ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
});

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  let modified = false;

  // 1. Remover importações quebradas de imagens
  const imageImports = [];
  content = content.replace(/import\s+(\w+)\s+from\s+["'](?:@\/|\.\/)?(public|assets)\/images\/(.+?\.(svg|png|jpe?g))["'];?/g, (match, varName, _, filename) => {
    imageImports.push({ varName, filename });
    modified = true;
    return "";
  });

  // 2. Corrigir src={Variável} → src="/images/arquivo.ext"
  imageImports.forEach(({ varName, filename }) => {
    const propRegex = new RegExp(`src=\\{${varName}\\}`, "g");
    const tagRegex = new RegExp(`<${varName}([^>]*)\\/?>`, "g");

    content = content.replace(propRegex, `src="/images/${filename}"`);
    content = content.replace(tagRegex, `<Image src="/images/${filename}"$1 />`);
  });

  // 3. Adicionar width/height se faltando
  content = content.replace(/<Image([^>]*?)src=["'][^"']+["']([^>]*)\/?>/g, (match, before, after) => {
    if (/width=/.test(match) && /height=/.test(match)) return match;
    modified = true;
    return `<Image${before}src="${match.match(/src=["'][^"']+["']/)[0].split('=')[1]}" width={100} height={100}${after} />`;
  });

  // 4. Adicionar import do next/image se necessário
  if (!content.includes('from "next/image"') && content.includes("<Image")) {
    content = `import Image from "next/image";\n${content}`;
    modified = true;
  }

  // 5. Adicionar import React se tiver JSX e não tiver React
  const usesJSX = /return\s*\(\s*<\s*/.test(content);
  const hasReactImport = content.includes("import React");
  if (usesJSX && !hasReactImport) {
    content = `import React from "react";\n${content}`;
    modified = true;
  }

  if (modified && content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🛠️ Corrigido: ${path.relative(projectRoot, filePath)}`);
  }
});
