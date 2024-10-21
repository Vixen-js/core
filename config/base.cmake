set(CMAKE_INCLUDE_CURRENT_DIR ON)

find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif()

set(CMAKE_OSX_DEPLOYMENT_TARGET "10.13" CACHE STRING "Minimum OS X deployment version")

function(AddBaseConfig addonName)
    target_compile_features(${addonName} PRIVATE
        cxx_constexpr
        cxx_inheriting_constructors
        cxx_lambdas
        cxx_auto_type
        cxx_variadic_templates
        cxx_std_17
    )

    if(napi_build_version)
        target_compile_definitions(${addonName} PRIVATE NAPI_VERSION=${napi_build_version})
    endif(napi_build_version)

    if(WIN32)
        target_compile_definitions(${addonName} PRIVATE ENUM_BITFIELDS_NOT_SUPPORTED)
    endif(WIN32)
endfunction(AddBaseConfig addonName)

function(GetModuleVersion moduleName packageJSONDir)
    execute_process(COMMAND node -p "require('${packageJSONDir}/package.json').version"
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        OUTPUT_VARIABLE packageJSONVersion
    )
    string(REPLACE "\n" "" packageJSONVersion "${packageJSONVersion}")
    string(REPLACE "\"" "" packageJSONVersion "${packageJSONVersion}")

    set("${moduleName}_VERSION" "${packageJSONVersion}" PARENT_SCOPE)
endfunction(GetModuleVersion moduleName packageJSONDir)