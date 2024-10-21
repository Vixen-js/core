#!/usr/bin/env node

const os = require("os");
const path = require("path");
const qodeConfig = require("@nodegui/qode");
const managePath = require("manage-path");
const { qtHome } = require("../config/setupQt.js");
const proc = require("child_process");

let alterPath = managePath(process.env);
alterPath.unshift(path.join(qtHome, "bin"));

if (os.platform() === "linux") {
  let oldPath = process.env.LD_LIBRARY_PATH ?? "";
  process.env.LD_LIBRARY_PATH = `${oldPath}:${path.join(qtHome, "lib")}`;
}

let child = proc.spawn(qodeConfig.qodePath, process.argv.slice(2), {
  stdio: "inherit",
  windowsHide: false,
  env: process.env,
});

child.on("close", (code) => {
  process.exit(code);
});

const handleSignal = (signal) => {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
};

handleSignal("SIGINT");
handleSignal("SIGTERM");
