#pragma once
#include <QInputDialog>

#include "Extras/Export/export.h"
#include "QtWidgets/QDialog/qdialog_macro.h"
#include "core/NodeWidget/nodewidget.h"
#include "napi.h"

class DLL_EXPORT NInputDialog : public QInputDialog, public NodeWidget
{
  public:
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QInputDialog)
    using QInputDialog::QInputDialog;
    virtual void connectSignalsToEventEmitter()
    {
        QDIALOG_SIGNALS
        QObject::connect(this, &QInputDialog::doubleValueChanged, [=](double val) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto value = Napi::Number::New(env, val);
            this->emitOnNode.Call({Napi::String::New(env, "onDoubleValueChange"), value});
        });
        QObject::connect(this, &QInputDialog::doubleValueSelected, [=](double val) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto value = Napi::Number::New(env, val);
            this->emitOnNode.Call({Napi::String::New(env, "onDoubleValueSelect"), value});
        });
        QObject::connect(this, &QInputDialog::intValueChanged, [=](int val) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto value = Napi::Number::New(env, val);
            this->emitOnNode.Call({Napi::String::New(env, "onIntValueChange"), value});
        });
        QObject::connect(this, &QInputDialog::intValueSelected, [=](int val) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto value = Napi::Number::New(env, val);
            this->emitOnNode.Call({Napi::String::New(env, "onIntValueSelect"), value});
        });
        QObject::connect(this, &QInputDialog::textValueChanged, [=](QString text) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto value = Napi::String::New(env, text.toStdString());
            this->emitOnNode.Call({Napi::String::New(env, "onTextValueChange"), value});
        });
        QObject::connect(this, &QInputDialog::textValueSelected, [=](QString text) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto value = Napi::String::New(env, text.toStdString());
            this->emitOnNode.Call({Napi::String::New(env, "onTextValueSelect"), value});
        });
    }
};
