const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");

const files = glob.sync(`${projectRoot}/**/*.{tsx,jsx}`, {
  ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
});

// Regex para pegar src={Stripes}, src={Logo01}, etc.
const brokenSrcRegex = /src=\{(\w+)\}/g;

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;
  const variablesCorrigidas = [];

  content = content.replace(brokenSrcRegex, (match, varName) => {
    const fallbackFile = varName.toLowerCase().replace(/img|overlay/g, "").replace(/(\d)/g, "-$1");
    const fallback = `/images/${fallbackFile}.svg`;
    variablesCorrigidas.push({ varName, fallback });
    modified = true;
    return `src="${fallback}"`;
  });

  if (modified) {
    // Remove imports quebrados ainda existentes
    content = content.replace(/import\s+\w+\s+from\s+["'][^"']+\.(svg|png|jpe?g)["'];?/g, "");
    if (!content.includes('from "next/image"')) {
      content = `import Image from "next/image";\n${content}`;
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🛠️ Corrigido uso direto de variáveis quebradas: ${path.relative(projectRoot, filePath)}`);
    variablesCorrigidas.forEach(v => console.log(`   ↳ src={${v.varName}} → src="${v.fallback}"`));
  }
});
