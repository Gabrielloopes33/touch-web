const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");

const files = glob.sync(`${projectRoot}/**/*.{tsx,jsx}`, {
  ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
});

const importRegex = /import\s+(\w+)\s+from\s+["'](?:@\/|\.\/)?(public|assets)\/images\/(.+?\.(svg|png|jpe?g))["'];?/g;

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;
  const replacements = [];

  content = content.replace(importRegex, (match, varName, folder, filename, ext) => {
    replacements.push({ varName, filename });
    modified = true;
    return ""; // remove o import quebrado
  });

  replacements.forEach(({ varName, filename }) => {
    const varRegex = new RegExp(`src=\\{${varName}\\}`, "g");
    const tagRegex = new RegExp(`<${varName}([^>]*)\\/?>`, "g");

    content = content.replace(varRegex, `src="/images/${filename}"`);
    content = content.replace(tagRegex, `<Image src="/images/${filename}"$1 />`);
  });

  if (modified && !content.includes('from "next/image"')) {
    content = `import Image from "next/image";\n${content}`;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Corrigido: ${path.relative(projectRoot, filePath)}`);
  }
});
