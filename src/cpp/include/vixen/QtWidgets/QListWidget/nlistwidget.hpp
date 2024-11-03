#pragma once

#include <napi.h>

#include <QListWidget>

#include "Extras/Export/export.h"
#include "QtWidgets/QListView/qlistview_macro.h"
#include "QtWidgets/QListWidgetItem/qlistwidgetitem_wrap.h"
#include "core/NodeWidget/nodewidget.h"

class DLL_EXPORT NListWidget : public QListWidget, public NodeWidget
{
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QListWidget)
  public:
    using QListWidget::QListWidget;

    virtual void connectSignalsToEventEmitter()
    {
        QLISTVIEW_SIGNALS
        // Qt Connects: Implement all signal connects here
        QObject::connect(
            this, &QListWidget::currentItemChanged, [=](QListWidgetItem *current, QListWidgetItem *previous) {
                Napi::Env env = this->emitOnNode.Env();
                Napi::HandleScope scope(env);
                auto curInstance = QListWidgetItemWrap::constructor.New(
                    {Napi::External<QListWidgetItem>::New(env, current), Napi::Boolean::New(env, true)});
                auto preInstance = QListWidgetItemWrap::constructor.New(
                    {Napi::External<QListWidgetItem>::New(env, previous), Napi::Boolean::New(env, true)});
                this->emitOnNode.Call({Napi::String::New(env, "onCurrentItemChange"), curInstance, preInstance});
            });
        QObject::connect(this, &QListWidget::currentRowChanged, [=](int currentRow) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onCurrentRowChange"), Napi::Number::New(env, currentRow)});
        });
        QObject::connect(this, &QListWidget::currentTextChanged, [=](const QString &currentText) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call(
                {Napi::String::New(env, "onCurrentTextChange"), Napi::String::New(env, currentText.toStdString())});
        });
        QObject::connect(this, &QListWidget::itemActivated, [=](QListWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = QListWidgetItemWrap::constructor.New(
                {Napi::External<QListWidgetItem>::New(env, item), Napi::Boolean::New(env, true)});
            this->emitOnNode.Call({Napi::String::New(env, "onItemActivate"), instance});
        });
        QObject::connect(this, &QListWidget::itemChanged, [=](QListWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = QListWidgetItemWrap::constructor.New(
                {Napi::External<QListWidgetItem>::New(env, item), Napi::Boolean::New(env, true)});
            this->emitOnNode.Call({Napi::String::New(env, "onItemChange"), instance});
        });
        QObject::connect(this, &QListWidget::itemClicked, [=](QListWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = QListWidgetItemWrap::constructor.New(
                {Napi::External<QListWidgetItem>::New(env, item), Napi::Boolean::New(env, true)});
            this->emitOnNode.Call({Napi::String::New(env, "onItemClick"), instance});
        });
        QObject::connect(this, &QListWidget::itemDoubleClicked, [=](QListWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = QListWidgetItemWrap::constructor.New(
                {Napi::External<QListWidgetItem>::New(env, item), Napi::Boolean::New(env, true)});
            this->emitOnNode.Call({Napi::String::New(env, "onItemDblClick"), instance});
        });
        QObject::connect(this, &QListWidget::itemEntered, [=](QListWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = QListWidgetItemWrap::constructor.New(
                {Napi::External<QListWidgetItem>::New(env, item), Napi::Boolean::New(env, true)});
            this->emitOnNode.Call({Napi::String::New(env, "onItemEnter"), instance});
        });
        QObject::connect(this, &QListWidget::itemPressed, [=](QListWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            auto instance = QListWidgetItemWrap::constructor.New(
                {Napi::External<QListWidgetItem>::New(env, item), Napi::Boolean::New(env, true)});
            this->emitOnNode.Call({Napi::String::New(env, "onItemPress"), instance});
        });
        QObject::connect(this, &QListWidget::itemSelectionChanged, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onItemSelectionChange")});
        });
    }
};
