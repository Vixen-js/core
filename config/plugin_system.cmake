set(PLUGIN_CMAKE_DIR "${CMAKE_CURRENT_LIST_DIR}")
set(VIXEN_ROOT "${PLUGIN_CMAKE_DIR}/..")
set(VIXEN_LIB "${VIXEN_ROOT}/build/Release/vixen_core.node")

if(WIN32)
    set(VIXEN_LIB "${VIXEN_ROOT}\\build\\Release\\vixen_core.lib")
endif(WIN32)

include("${PLUGIN_CMAKE_DIR}/base.cmake")
include("${PLUGIN_CMAKE_DIR}/qt_setup.cmake")
include("${PLUGIN_CMAKE_DIR}/node_api.cmake")

macro(AddPluginSystem addonName)
    AddBaseConfig(${addonName})
    AddQtSetup(${addonName})
    AddNodeApiSupport(${addonName})

    target_link_libraries(${addonName} PRIVATE
        ${VIXEN_LIB}
    )

    target_include_directories(${addonName} PRIVATE
        "${CMAKE_JS_INC}"
        "${VIXEN_ROOT}"
        "${VIXEN_ROOT}/src/cpp"
        "${VIXEN_ROOT}/src/cpp/include"
        "${VIXEN_ROOT}/src/cpp/include/deps"
        "${VIXEN_ROOT}/src/cpp/include/vixen"
    )

endmacro(AddPluginSystem addonName)
