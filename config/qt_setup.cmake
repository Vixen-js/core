# Add Support to QT
# Add This ad the begining of CMakeLists.txt

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

set(QT_CONFIG_FILE ${CMAKE_CURRENT_LIST_DIR}/setupQt.js)

macro(AddQtSetup addonName)
    execute_process(COMMAND node -p "require('${QT_CONFIG_FILE}').qtCmakeDir"
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        OUTPUT_VARIABLE QT_CMAKE_HOME_DIR
    )

    string(REPLACE "\n" "" QT_CMAKE_HOME_DIR "${QT_CMAKE_HOME_DIR}")
    string(REPLACE "\"" "" QT_CMAKE_HOME_DIR "${QT_CMAKE_HOME_DIR}")

    message(STATUS "Using Qt installation for ${addonName} QT_CMAKE_HOME_DIR:${QT_CMAKE_HOME_DIR}")

    list(APPEND CMAKE_PREFIX_PATH "${QT_CMAKE_HOME_DIR}/../../..")
    find_package(Qt6 REQUIRED COMPONENTS Widgets Gui Core Svg SvgWidgets)
endmacro(AddQtSetup addonName)
