#pragma once
#include <vixen/core/NodeWidget/nodewidget.h>

#include <QMenu>

#include "Extras/Export/export.h"
#include "QtWidgets/QWidget/qwidget_macro.h"

class DLL_EXPORT NMenu : public QMenu, public NodeWidget
{
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QMenu)
  public:
    using QMenu::QMenu; // inherit all constructors of QMenu
    virtual void connectSignalsToEventEmitter()
    {
        QWIDGET_SIGNALS

        QObject::connect(this, &QMenu::aboutToHide, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onAboutToHide")});
        });

        QObject::connect(this, &QMenu::aboutToShow, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onAboutToShow")});
        });

        QObject::connect(this, &QMenu::hovered, [=](QAction *action) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = WrapperCache::instance.getWrapper(env, action);
            this->emitOnNode.Call({Napi::String::New(env, "onHover"), instance});
        });

        QObject::connect(this, &QMenu::triggered, [=](QAction *action) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = WrapperCache::instance.getWrapper(env, action);
            this->emitOnNode.Call({Napi::String::New(env, "onTrigger"), instance});
        });
    }
};
