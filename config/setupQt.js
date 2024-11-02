const os = require("os");
const path = require("path");
const fs = require("fs");

const SETUP_DIR = path.resolve(__dirname, "..", "qt-mini");
const QT_VERSION = "6.6.0";
const MIRROR_URL = Boolean(process.env.QT_MIRROR)
  ? process.env.QT_LINK_MIRROR
  : "https://download.qt.io";

function getQt() {
  switch (os.platform()) {
    case "darwin": {
      const qtHome = path.resolve(SETUP_DIR, QT_VERSION, "macOS");
      return {
        qtHome,
        components: [
          {
            name: "QT Base",
            link: `${MIRROR_URL}/online/qtsdkrepository/mac_x64/desktop/qt6_660/qt.qt6.660.clang_64/6.6.0-0-202310040910qtbase-MacOS-MacOS_12-Clang-MacOS-MacOS_12-X86_64-ARM64.7z`,
            skip: () =>
              fs.existsSync(
                path.resolve(qtHome, "plugins", "platforms", "libqcocoa.dylib")
              ),
          },
          {
            name: "QT Svg",
            link: `${MIRROR_URL}/online/qtsdkrepository/mac_x64/desktop/qt6_660/qt.qt6.660.clang_64/6.6.0-0-202310040910qtsvg-MacOS-MacOS_12-Clang-MacOS-MacOS_12-X86_64-ARM64.7z`,
            skip: () =>
              fs.existsSync(
                path.resolve(qtHome, "lib", "QtSvg.framework", "QtSvg")
              ),
          },
          {
            name: "QT Tools",
            link: `${MIRROR_URL}/online/qtsdkrepository/mac_x64/desktop/qt6_660/qt.qt6.660.clang_64/6.6.0-0-202310040910qttools-MacOS-MacOS_12-Clang-MacOS-MacOS_12-X86_64-ARM64.7z`,
            skip: () =>
              fs.existsSync(path.resolve(qtHome, "bin", "macdeployqt")),
          },
        ],
      };
    }
    case "win32": {
      const qtHome = path.resolve(SETUP_DIR, QT_VERSION, "msvc2019_64");
      return {
        qtHome,
        artifacts: [
          {
            name: "Qt Base",
            link: `${MIRROR_URL}/online/qtsdkrepository/windows_x86/desktop/qt6_660/qt.qt6.660.win64_msvc2019_64/6.6.0-0-202310040911qtbase-Windows-Windows_10_22H2-MSVC2019-Windows-Windows_10_22H2-X86_64.7z`,
            skipSetup: checkIfExists(
              path.resolve(qtHome, "bin", "Qt6Core.dll")
            ),
          },
          {
            name: "Qt Svg",
            link: `${MIRROR_URL}/online/qtsdkrepository/windows_x86/desktop/qt6_660/qt.qt6.660.win64_msvc2019_64/6.6.0-0-202310040911qtsvg-Windows-Windows_10_22H2-MSVC2019-Windows-Windows_10_22H2-X86_64.7z`,
            skipSetup: checkIfExists(path.resolve(qtHome, "bin", "Qt6Svg.dll")),
          },
          {
            name: "Qt Tools",
            link: `${MIRROR_URL}/online/qtsdkrepository/windows_x86/desktop/qt6_660/qt.qt6.660.win64_msvc2019_64/6.6.0-0-202310040911qttools-Windows-Windows_10_22H2-MSVC2019-Windows-Windows_10_22H2-X86_64.7z`,
            skipSetup: checkIfExists(
              path.resolve(qtHome, "bin", "windeployqt.exe")
            ),
          },
        ],
      };
    }
    case "linux": {
      const qtHome = path.resolve(SETUP_DIR, QT_VERSION, "gcc_64");
      return {
        qtHome,
        components: [
          {
            name: "QT Base",
            link: `${MIRROR_URL}/online/qtsdkrepository/linux_x64/desktop/qt6_660/qt.qt6.660.gcc_64/6.6.0-0-202310040911qtbase-Linux-RHEL_8_6-GCC-Linux-RHEL_8_6-X86_64.7z`,
            skip: () =>
              fs.existsSync(
                path.resolve(qtHome, "plugins", "platforms", "libqcocoa.dylib")
              ),
          },
          {
            name: "QT Svg",
            link: `${MIRROR_URL}/online/qtsdkrepository/linux_x64/desktop/qt6_660/qt.qt6.660.gcc_64/6.6.0-0-202310040911qtsvg-Linux-RHEL_8_6-GCC-Linux-RHEL_8_6-X86_64.7z`,
            skip: () =>
              fs.existsSync(
                path.resolve(qtHome, "lib", "QtSvg.framework", "QtSvg")
              ),
          },
          {
            name: "QT Tools",
            link: `${MIRROR_URL}/online/qtsdkrepository/linux_x64/desktop/qt6_660/qt.qt6.660.gcc_64/6.6.0-0-202310040911icu-linux-Rhel7.2-x64.7z`,
            skip: () =>
              fs.existsSync(path.resolve(qtHome, "bin", "macdeployqt")),
          },
        ],
      };
    }
  }
}

const qtMini = {
  ...getQt(),
  version: QT_VERSION,
  setupDir: SETUP_DIR,
};

const useCustomDir =
  process.env.QT_INSTALL_DIR !== undefined &&
  process.env.QT_INSTALL_DIR !== null;
const qtHome = useCustomDir ? process.env.QT_INSTALL_DIR : qtMini.qtHome;

const qtCmakeDir = path.resolve(qtHome, "lib", "cmake", "Qt6");

module.exports = { qtHome, qtMini, qtCmakeDir, useCustomDir };
