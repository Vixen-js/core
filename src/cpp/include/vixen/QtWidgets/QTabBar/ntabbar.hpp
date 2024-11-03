#pragma once

#include <QTabBar>

#include "Extras/Export/export.h"
#include "QtWidgets/QWidget/qwidget_macro.h"
#include "core/NodeWidget/nodewidget.h"
#include "napi.h"

class DLL_EXPORT NTabBar : public QTabBar, public NodeWidget
{
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QTabBar)
  public:
    using QTabBar::QTabBar; // inherit all constructors of QTabBar

    virtual void connectSignalsToEventEmitter()
    {
        QWIDGET_SIGNALS
        // Qt Connects: Implement all signal connects here
        QObject::connect(this, &QTabBar::currentChanged, [=](int index) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onCurrentChange"), Napi::Number::New(env, index)});
        });
        QObject::connect(this, &QTabBar::tabBarClicked, [=](int index) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onTabBarClick"), Napi::Number::New(env, index)});
        });
        QObject::connect(this, &QTabBar::tabBarDoubleClicked, [=](int index) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onTabBarDblClick"), Napi::Number::New(env, index)});
        });

        QObject::connect(this, &QTabBar::tabCloseRequested, [=](int index) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onTabCloseRequest"), Napi::Number::New(env, index)});
        });
        QObject::connect(this, &QTabBar::tabMoved, [=](int from, int to) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onTabMove"), Napi::Number::New(env, from), Napi::Number::New(env, to)});
        });
    }
};
