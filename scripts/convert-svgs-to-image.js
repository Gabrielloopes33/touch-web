const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");

const files = glob.sync(`${projectRoot}/**/*.{tsx,jsx}`, {
  ignore: ["**/node_modules/**", "**/.next/**"],
});

const svgImportRegex = /import\s+(\w+)\s+from\s+["'](?:@\/assets|@\/public)\/images\/(.+?)\.svg["'];?/g;

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;
  const svgMappings = [];

  content = content.replace(svgImportRegex, (match, varName, fileName) => {
    svgMappings.push({ varName, fileName });
    modified = true;
    return ""; // remove a linha de importação
  });

  svgMappings.forEach(({ varName, fileName }) => {
    const componentRegex = new RegExp(`<${varName}([^>]*)\\/?>`, "g");
    content = content.replace(componentRegex, `<Image src="/images/${fileName}.svg"$1 />`);
    modified = true;
  });

  // Adiciona import de next/image se necessário
  if (modified && !content.includes('from "next/image"')) {
    content = `import Image from "next/image";\n${content}`;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Atualizado: ${path.relative(projectRoot, filePath)}`);
  }
});
