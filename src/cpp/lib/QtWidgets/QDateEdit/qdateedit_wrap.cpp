#include "QtWidgets/QDateEdit/qdateedit_wrap.h"

#include "Extras/Utils/nutils.h"

Napi::FunctionReference QDateEditWrap::constructor;

Napi::Object QDateEditWrap::init(Napi::Env env, Napi::Object exports)
{
    Napi::HandleScope scope(env);
    char CLASSNAME[] = "QDateEdit";
    Napi::Function func = DefineClass(env, CLASSNAME, {QDATETIMEEDIT_WRAPPED_METHODS_EXPORT_DEFINE(QDateEditWrap)});
    constructor = Napi::Persistent(func);
    exports.Set(CLASSNAME, func);
    QOBJECT_REGISTER_WRAPPER(QDateEdit, QDateEditWrap);
    return exports;
}

QDateEdit *QDateEditWrap::getInternalInstance()
{
    return this->instance;
}

QDateEditWrap::QDateEditWrap(const Napi::CallbackInfo &info) : Napi::ObjectWrap<QDateEditWrap>(info)
{
    Napi::Env env = info.Env();
    size_t argCount = info.Length();
    if (argCount == 0)
    {
        // --- Construct a new instance
        this->instance = new NDateEdit();
    }
    else if (argCount == 1)
    {
        if (info[0].IsExternal())
        {
            // --- Wrap a given C++ instance
            this->instance = info[0].As<Napi::External<QDateEdit>>().Data();
        }
        else
        {
            // --- Construct a new instance and pass a parent
            Napi::Object parentObject = info[0].As<Napi::Object>();
            NodeWidgetWrap *parentWidgetWrap = Napi::ObjectWrap<NodeWidgetWrap>::Unwrap(parentObject);
            this->instance = new NDateEdit(parentWidgetWrap->getInternalInstance());
        }
    }
    else
    {
        Napi::TypeError::New(env, "Vixen: QDateEditWrap: Wrong number of arguments to constructor")
            .ThrowAsJavaScriptException();
    }
    this->rawData = extrautils::configureQWidget(this->getInternalInstance(), true);
}

QDateEditWrap::~QDateEditWrap()
{
    extrautils::safeDelete(this->instance);
}
