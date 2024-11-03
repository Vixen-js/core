#pragma once
#include <QTableWidget>

#include "Extras/Export/export.h"
#include "QtWidgets/QAbstractScrollArea/qabstractscrollarea_macro.h"
#include "core/NodeWidget/nodewidget.h"
#include "napi.h"

class DLL_EXPORT NTableWidget : public QTableWidget, public NodeWidget
{
  public:
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QTableWidget)
    using QTableWidget::QTableWidget;
    virtual void connectSignalsToEventEmitter()
    {
        // Qt Connects: Implement all signal connects here
        QABSTRACTSCROLLAREA_SIGNALS
        QObject::connect(this, &QTableWidget::cellActivated, [=](int row, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onCellActivate"), Napi::Number::New(env, row),
                                   Napi::Number::New(env, column)});
        });
        QObject::connect(this, &QTableWidget::cellChanged, [=](int row, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onCellChange"), Napi::Number::New(env, row), Napi::Number::New(env, column)});
        });
        QObject::connect(this, &QTableWidget::cellClicked, [=](int row, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onCellClick"), Napi::Number::New(env, row), Napi::Number::New(env, column)});
        });
        QObject::connect(this, &QTableWidget::cellDoubleClicked, [=](int row, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onCellDblClick"), Napi::Number::New(env, row),
                                   Napi::Number::New(env, column)});
        });
        QObject::connect(this, &QTableWidget::cellEntered, [=](int row, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onCellEnter"), Napi::Number::New(env, row), Napi::Number::New(env, column)});
        });
        QObject::connect(this, &QTableWidget::cellPressed, [=](int row, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onCellPress"), Napi::Number::New(env, row), Napi::Number::New(env, column)});
        });
        QObject::connect(this, &QTableWidget::currentCellChanged,
                         [=](int currentRow, int currentColumn, int previousRow, int previousColumn) {
                             Napi::Env env = this->emitOnNode.Env();
                             Napi::HandleScope scope(env);
                             this->emitOnNode.Call(
                                 {Napi::String::New(env, "onCurrentCellChange"), Napi::Number::New(env, currentRow),
                                  Napi::Number::New(env, currentColumn), Napi::Number::New(env, previousRow),
                                  Napi::Number::New(env, previousColumn)});
                         });
    }
};