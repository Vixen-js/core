const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "..", "package.json");
const pkg = detectPackageMgr();

let fileContent = fs.readFileSync(packageJsonPath, "utf8");
console.log("Fixing scripts in package.json");
fileContent = fileContent.replace(/\$npm_execpath/g, pkg);

fs.writeFileSync(packageJsonPath, fileContent);
console.log("Done.");

function detectPackageMgr() {
  if (fs.existsSync(path.join(__dirname, "..", "pnpm-lock.yaml"))) {
    return "pnpm";
  } else if (fs.existsSync(path.join(__dirname, "..", "yarn.lock"))) {
    return "yarn";
  } else {
    return "npm";
  }
}
