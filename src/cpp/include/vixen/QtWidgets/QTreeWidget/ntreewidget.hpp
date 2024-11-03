#pragma once
#include <QTreeWidget>

#include "Extras/Export/export.h"
#include "QtWidgets/QAbstractScrollArea/qabstractscrollarea_macro.h"
#include "QtWidgets/QTreeWidgetItem/qtreewidgetitem_wrap.h"
#include "core/NodeWidget/nodewidget.h"
#include "napi.h"

class DLL_EXPORT NTreeWidget : public QTreeWidget, public NodeWidget
{
    Q_OBJECT
    NODEWIDGET_IMPLEMENTATIONS(QTreeWidget)

  public:
    using QTreeWidget::QTreeWidget; // inherit all constructors of QTreeWidget

    virtual void connectSignalsToEventEmitter()
    {
        QABSTRACTSCROLLAREA_SIGNALS
        QObject::connect(this, &QTreeWidget::itemSelectionChanged, [=]() {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);
            this->emitOnNode.Call({Napi::String::New(env, "onItemSelectionChange")});
        });

        QObject::connect(this, &QTreeWidget::itemClicked, [=](QTreeWidgetItem *item, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);
            auto columnWrap = Napi::Value::From(env, column);

            this->emitOnNode.Call({Napi::String::New(env, "onItemClick"), itemWrap, columnWrap});
        });

        QObject::connect(this, &QTreeWidget::itemChanged, [=](QTreeWidgetItem *item, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);
            auto columnWrap = Napi::Value::From(env, column);

            this->emitOnNode.Call({Napi::String::New(env, "onItemChange"), itemWrap, columnWrap});
        });

        QObject::connect(this, &QTreeWidget::currentItemChanged,
                         [=](QTreeWidgetItem *current, QTreeWidgetItem *previous) {
                             Napi::Env env = this->emitOnNode.Env();
                             Napi::HandleScope scope(env);

                             auto currentItemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, current);
                             auto previousItemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, previous);

                             this->emitOnNode.Call(
                                 {Napi::String::New(env, "onCurrentItemChange"), currentItemWrap, previousItemWrap});
                         });

        QObject::connect(this, &QTreeWidget::itemActivated, [=](QTreeWidgetItem *item, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);
            auto columnWrap = Napi::Value::From(env, column);

            this->emitOnNode.Call({Napi::String::New(env, "onItemActivate"), itemWrap, columnWrap});
        });

        QObject::connect(this, &QTreeWidget::itemCollapsed, [=](QTreeWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);

            this->emitOnNode.Call({Napi::String::New(env, "onItemCollapse"), itemWrap});
        });

        QObject::connect(this, &QTreeWidget::itemDoubleClicked, [=](QTreeWidgetItem *item, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);
            auto columnWrap = Napi::Value::From(env, column);

            this->emitOnNode.Call({Napi::String::New(env, "onItemDblClick"), itemWrap, columnWrap});
        });

        QObject::connect(this, &QTreeWidget::itemEntered, [=](QTreeWidgetItem *item, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);
            auto columnWrap = Napi::Value::From(env, column);

            this->emitOnNode.Call({Napi::String::New(env, "onItemEnter"), itemWrap, columnWrap});
        });

        QObject::connect(this, &QTreeWidget::itemExpanded, [=](QTreeWidgetItem *item) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);

            this->emitOnNode.Call({Napi::String::New(env, "onItemExpand"), itemWrap});
        });

        QObject::connect(this, &QTreeWidget::itemPressed, [=](QTreeWidgetItem *item, int column) {
            Napi::Env env = this->emitOnNode.Env();
            Napi::HandleScope scope(env);

            auto itemWrap = QTreeWidgetItemWrap::fromQTreeWidgetItem(env, item);
            auto columnWrap = Napi::Value::From(env, column);

            this->emitOnNode.Call({Napi::String::New(env, "onItemPress"), itemWrap, columnWrap});
        });
    }
};