#!/use/bin/env node

const os = require("os");
const fs = require("fs");
const path = require("path");
const { setupQT } = require("@vixen-js/pkg-installer");
const tar = require("tar");
const pkg = require("../package.json");

const SETUP_DIR = path.resolve(__dirname, "..", "build", "Release");

async function setupBin() {
  const { version } = pkg;
  const tarballName = `vixen-bin-v${version}-${os.platform()}-${os.arch()}.tar.gz`;
  const url = `https://github.com/Vixen-js/core/releases/download/v${version}/${tarballName}`;

  await setupQT({
    outputDir: SETUP_DIR,
    id: "vixen-core",
    displayName: `Precompiled Vixen Core Binary`,
    downloadLink: url,
    skipSetup: () => false,
  });

  const tarPath = path.join(SETUP_DIR, tarballName.slice(0, -3));
  tar.extract({
    cwd: SETUP_DIR,
    file: tarPath,
    sync: true,
  });
  fs.unlinkSync(tarPath);
}

setupBin()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
