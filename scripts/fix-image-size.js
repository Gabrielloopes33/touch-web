const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");

const files = glob.sync(`${projectRoot}/**/*.{tsx,jsx}`, {
  ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
});

// Regex para pegar <Image ... src="/images/..." />
const imageTagRegex = /<Image([^>]*?)\s+src=["']\/images\/(.+?)["']([^>]*)\/?>/g;

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  content = content.replace(imageTagRegex, (match, before, filename, after) => {
    // Se já tem width ou height, não mexe
    if (/width\s*=/.test(match) && /height\s*=/.test(match)) {
      return match;
    }

    modified = true;
    return `<Image${before} src="/images/${filename}" width={100} height={100}${after} />`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🛠️ Adicionado width/height em: ${path.relative(projectRoot, filePath)}`);
  }
});
