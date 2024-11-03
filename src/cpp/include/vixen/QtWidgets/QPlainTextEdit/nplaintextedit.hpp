#pragma once
#include <QPlainTextEdit>

#include "Extras/Export/export.h"
#include "QtWidgets/QAbstractScrollArea/qabstractscrollarea_macro.h"
#include "core/NodeWidget/nodewidget.h"
class DLL_EXPORT NPlainTextEdit : public QPlainTextEdit, public NodeWidget
{
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QPlainTextEdit)
  public:
    using QPlainTextEdit::QPlainTextEdit; // inherit all constructors of
                                          // QPlainTextEdit

    virtual void connectSignalsToEventEmitter()
    {
        QABSTRACTSCROLLAREA_SIGNALS

        // Qt Connects: Implement all signal connects here
        QObject::connect(this, &QPlainTextEdit::textChanged, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onTextChange")});
        });
        QObject::connect(this, &QPlainTextEdit::blockCountChanged, [=](int newBlockCount) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onBlockCountChange"), Napi::Value::From(env, newBlockCount)});
        });
        QObject::connect(this, &QPlainTextEdit::copyAvailable, [=](bool yes) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onCopyAvailable"), Napi::Value::From(env, yes)});
        });
        QObject::connect(this, &QPlainTextEdit::cursorPositionChanged, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onCursorPositionChange")});
        });
        QObject::connect(this, &QPlainTextEdit::modificationChanged, [=](bool changed) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onModificationChange"), Napi::Value::From(env, changed)});
        });
        QObject::connect(this, &QPlainTextEdit::redoAvailable, [=](bool available) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onRedoAvailable"), Napi::Value::From(env, available)});
        });
        QObject::connect(this, &QPlainTextEdit::selectionChanged, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onSelectionChange")});
        });
        QObject::connect(this, &QPlainTextEdit::undoAvailable, [=](bool available) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onUndoAvailable"), Napi::Value::From(env, available)});
        });
    }
};
