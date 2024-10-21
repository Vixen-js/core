#!/use/bin/env node

const { setupQT } = require("@vixen-js/pkg-installer");
const { qtMini, qtHome, useCustomDir } = require("../config/setupQt.js");

async function installQt() {
  return Promise.all(
    qtMini.components.map(({ name, link, skip }) =>
      setupQT({
        outputDir: qtMini.setupDir,
        id: "vixen-js-qt-mini",
        displayName: `${name} Minimal Qt: ${qtMini.version} archive`,
        downloadLink: link,
        skipSetup: skip,
      })
    )
  );
}

if (!useCustomDir) {
  console.log(`Minimal QT ${qtMini.version} setup:`);

  installQt().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  console.log(
    `Minimal QT ${qtMini.version} setup skipped. Using custom QT installation directory: ${qtHome}`
  );
}
