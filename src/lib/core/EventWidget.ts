import { EventEmitter } from "events";
import { NativeElement, Component, NativeRawPointer } from "./Component";
import { wrapNative, wrapWithActivateUvLoop } from "../utils/helpers";

function addDefaultErrorHandler(
  native: NativeElement,
  emitter: EventEmitter
): void {
  native.subscribeToQtEvent("error");
  emitter.addListener("error", () => null);
}

export interface EventListenerOptions {
  /**
   * This applies only when listening to QEvents. If set to true, then the callback will
   * be called after the default processing by the base widget has occurred. By default
   * callbacks for QEvents are called before the base widget `::event()` is called.
   */
  afterDefault?: boolean;
}

/**

> Abstract class that adds event handling support to all widgets.

**This class implements an event emitter and merges it with Qt's event and signal system. It allows us to register and unregister event and signal listener at will from javascript**

`EventWidget` is an abstract class and hence no instances of the same should be created. It exists so that we can add event handling functionalities to all widget's easily. This is an internal class.

### Example

```javascript
import { QWidget, QWidgetSignals, WidgetEventTypes } from "@vixen-js/core";

const view = new QWidget();
// You either listen for a widget's signal
view.addEventListener('onWindowTitleChange', () => {
  console.log("window title changed");
});

// or you can listen for an event

view.addEventListener(WidgetEventTypes.MouseMove, () => {
  console.log("mouse moved");
});
```
 */

export abstract class EventWidget<Signals extends unknown> extends Component {
  private emitter: EventEmitter;
  private _isEventProcessed = false;

  constructor(native: NativeElement) {
    super(native);
    if (native.initNodeEventEmitter == null) {
      throw new Error("initNodeEventEmitter not implemented on native side");
    }

    const preexistingEmitterFunc = native.getNodeEventEmitter();
    if (preexistingEmitterFunc != null) {
      this.emitter = preexistingEmitterFunc.emitter;
      return;
    }

    this.emitter = new EventEmitter();
    this.emitter.emit = wrapWithActivateUvLoop(
      this.emitter.emit.bind(this.emitter)
    );
    const logExceptions = (eventName: string, ...args: any[]): boolean => {
      // Preserve the value of `_isQObjectEventProcessed` as we dispatch this event
      // to JS land, and restore it afterwards. This lets us support recursive event
      // dispatches on the same object.
      const previousEventProcessed = this._isEventProcessed;
      this._isEventProcessed = false;

      // Events start with a capital letter, signals are lower case by convention.
      const firstChar = eventName.charAt(0);
      const isQEvent = firstChar.toUpperCase() === firstChar;
      if (isQEvent) {
        try {
          const event = wrapNative(args[0]);
          const afterBaseWidget = args[1];
          const baseWidgetResult = args[2];
          if (!afterBaseWidget) {
            this.emitter.emit(eventName, event);
          } else {
            this._isEventProcessed = baseWidgetResult;
            this.emitter.emit(`${eventName}_after`, event);
          }
        } catch (e) {
          console.log(
            `An exception was thrown while dispatching an event of type '${eventName.toString()}':`
          );
          console.log(e);
        }
      } else {
        try {
          const wrappedArgs = args.map(wrapNative);
          this.emitter.emit(eventName, ...wrappedArgs);
        } catch (e) {
          console.log(
            `An exception was thrown while dispatching a signal of type '${eventName.toString()}':`
          );
          console.log(e);
        }
      }

      const returnCode = this._isEventProcessed;
      this._isEventProcessed = previousEventProcessed;
      return returnCode;
    };
    logExceptions.emitter = this.emitter;
    native.initNodeEventEmitter(logExceptions);
    addDefaultErrorHandler(native, this.emitter);
  }

  /**
   * Get the state of the event processed flag
   *
   * See `setEventProcessed()`.
   *
   * @returns boolean True if the current event is flagged as processed.
   */
  eventProcessed(): boolean {
    return this._isEventProcessed;
  }

  /**
   * Mark the current event as having been processed
   *
   * This method is used to indicate that the currently dispatched event
   * has been processed and no further processing by superclasses is
   * required. It only makes sense to call this method from an event
   * handler.
   *
   * When set, this flag will cause Vixen's `QObject::event()` method to
   * return true and not call the superclass `event()`, effectively preventing
   * any further processing on this event.
   *
   * @param isProcessed true if the event has been processed.
   */
  setEventProcessed(isProcessed: boolean): void {
    this._isEventProcessed = isProcessed;
  }

  /**
     *
    @param signalType SignalType is a signal from the widgets signals interface.
    @param callback Corresponding callback for the signal as mentioned in the widget's signal interface
    @param options Extra optional options controlling how this event listener is added.
    @returns void

    For example in the case of QPushButton:
    ```js
    const button = new QPushButton();
    button.addEventListener('onClick',(checked)=>console.log("clicked"));
    // here onCLick is a value from QPushButtonSignals interface
    ```
     */
  addEventListener<SignalType extends keyof Signals>(
    signalType: SignalType,
    callback: Signals[SignalType],
    options?: EventListenerOptions
  ): void;

  /**

    @param eventType
    @param callback
    @param options Extra optional options controlling how this event listener is added.

    For example in the case of QPushButton:
    ```js
    const button = new QPushButton();
    button.addEventListener(WidgetEventTypes.HoverEnter,()=>console.log("hovered"));
    ```
    */
  addEventListener(
    eventType: WidgetEventTypes,
    callback: (event?: NativeRawPointer<"QEvent">) => void,
    options?: EventListenerOptions
  ): void;
  addEventListener(
    eventOrSignalType: string,
    callback: (...payloads: any[]) => void,
    options?: EventListenerOptions
  ): void {
    const eventOrSignalName = options?.afterDefault
      ? `${eventOrSignalType}_after`
      : eventOrSignalType;
    if (this.native?.subscribeToQtEvent(eventOrSignalType)) {
      this.emitter.addListener(eventOrSignalName, callback);
    } else {
      try {
        throw new Error();
      } catch (ex) {
        console.log(
          `WARNING: Unable to add event listener '${eventOrSignalType}'. (Perhaps this instance was not created by Vixen.)`
        );
        console.log(ex);
      }
    }
  }

  removeEventListener<SignalType extends keyof Signals>(
    signalType: SignalType,
    callback: Signals[SignalType],
    options?: EventListenerOptions
  ): void;
  removeEventListener(
    eventType: WidgetEventTypes,
    callback: (event?: NativeRawPointer<"QEvent">) => void,
    options?: EventListenerOptions
  ): void;
  removeEventListener(
    eventOrSignalType: string,
    callback?: (...payloads: any[]) => void,
    options?: EventListenerOptions
  ): void {
    const eventOrSignalTypeAfter = `${eventOrSignalType}_after`;
    const registeredEventName = options?.afterDefault
      ? eventOrSignalTypeAfter
      : eventOrSignalType;
    if (callback) {
      this.emitter.removeListener(registeredEventName, callback);
    } else {
      this.emitter.removeAllListeners(registeredEventName);
    }
    if (
      this.emitter.listenerCount(eventOrSignalType) +
        this.emitter.listenerCount(eventOrSignalTypeAfter) ===
      0
    ) {
      this.native?.unSubscribeToQtEvent(eventOrSignalType);
    }
  }
}

export enum WidgetEventTypes {
  "None" = "None",
  "OnActionAdd" = "OnActionAdd",
  "OnActionChange" = "OnActionChange",
  "OnActionRemove" = "OnActionRemove",
  "OnActivationChange" = "OnActivationChange",
  "OnApplicationActivate" = "OnApplicationActivate",
  "OnApplicationDeactivate" = "OnApplicationDeactivate",
  "OnApplicationFontChange" = "OnApplicationFontChange",
  "OnApplicationLayoutDirectionChange" = "OnApplicationLayoutDirectionChange",
  "OnApplicationPaletteChange" = "OnApplicationPaletteChange",
  "OnApplicationStateChange" = "OnApplicationStateChange",
  "OnApplicationWindowIconChange" = "OnApplicationWindowIconChange",
  "OnChildAdd" = "OnChildAdd",
  "OnChildPolish" = "OnChildPolish",
  "OnChildRemove" = "OnChildRemove",
  "OnClipboard" = "OnClipboard",
  "OnClose" = "OnClose",
  "OnCloseSoftwareInputPanel" = "OnCloseSoftwareInputPanel",
  "OnContentsRectChange" = "OnContentsRectChange",
  "OnContextMenu" = "OnContextMenu",
  "OnCursorChange" = "OnCursorChange",
  "OnDeferredDelete" = "OnDeferredDelete",
  "OnDragEnter" = "OnDragEnter",
  "OnDragLeave" = "OnDragLeave",
  "OnDragMove" = "OnDragMove",
  "OnDrop" = "OnDrop",
  "OnDynamicPropertyChange" = "OnDynamicPropertyChange",
  "OnEnabledChange" = "OnEnabledChange",
  "OnEnter" = "OnEnter",
  "OnEnterWhatsThisMode" = "OnEnterWhatsThisMode",
  "OnExpose" = "OnExpose",
  "OnFileOpen" = "OnFileOpen",
  "OnFocusIn" = "OnFocusIn",
  "OnFocusOut" = "OnFocusOut",
  "OnFocusAboutToChange" = "OnFocusAboutToChange",
  "OnFontChange" = "OnFontChange",
  "OnGesture" = "OnGesture",
  "OnGestureOverride" = "OnGestureOverride",
  "OnGrabKeyboard" = "OnGrabKeyboard",
  "OnGrabMouse" = "OnGrabMouse",
  "OnGraphicsSceneContextMenu" = "OnGraphicsSceneContextMenu",
  "OnGraphicsSceneDragEnter" = "OnGraphicsSceneDragEnter",
  "OnGraphicsSceneDragLeave" = "OnGraphicsSceneDragLeave",
  "OnGraphicsSceneDragMove" = "OnGraphicsSceneDragMove",
  "OnGraphicsSceneDrop" = "OnGraphicsSceneDrop",
  "OnGraphicsSceneHelp" = "OnGraphicsSceneHelp",
  "OnGraphicsSceneHoverEnter" = "OnGraphicsSceneHoverEnter",
  "OnGraphicsSceneHoverLeave" = "OnGraphicsSceneHoverLeave",
  "OnGraphicsSceneHoverMove" = "OnGraphicsSceneHoverMove",
  "OnGraphicsSceneMouseDblClick" = "OnGraphicsSceneMouseDblClick",
  "OnGraphicsSceneMouseMove" = "OnGraphicsSceneMouseMove",
  "OnGraphicsSceneMousePress" = "OnGraphicsSceneMousePress",
  "OnGraphicsSceneMouseRelease" = "OnGraphicsSceneMouseRelease",
  "OnGraphicsSceneMove" = "OnGraphicsSceneMove",
  "OnGraphicsSceneResize" = "OnGraphicsSceneResize",
  "OnGraphicsSceneWheel" = "OnGraphicsSceneWheel",
  "OnHide" = "OnHide",
  "OnHideToParent" = "OnHideToParent",
  "OnHoverEnter" = "OnHoverEnter",
  "OnHoverLeave" = "OnHoverLeave",
  "OnHoverMove" = "OnHoverMove",
  "OnIconDrag" = "OnIconDrag",
  "OnIconTextChange" = "OnIconTextChange",
  "OnInputMethod" = "OnInputMethod",
  "OnInputMethodQuery" = "OnInputMethodQuery",
  "OnKeyboardLayoutChange" = "OnKeyboardLayoutChange",
  "OnKeyPress" = "OnKeyPress",
  "OnKeyRelease" = "OnKeyRelease",
  "OnLanguageChange" = "OnLanguageChange",
  "OnLayoutDirectionChange" = "OnLayoutDirectionChange",
  "OnLayoutRequest" = "OnLayoutRequest",
  "OnLeave" = "OnLeave",
  "OnLeaveWhatsThisMode" = "OnLeaveWhatsThisMode",
  "OnLocaleChange" = "OnLocaleChange",
  "OnNonClientAreaMouseButtonDblClick" = "OnNonClientAreaMouseButtonDblClick",
  "OnNonClientAreaMouseButtonPress" = "OnNonClientAreaMouseButtonPress",
  "OnNonClientAreaMouseButtonRelease" = "OnNonClientAreaMouseButtonRelease",
  "OnNonClientAreaMouseMove" = "OnNonClientAreaMouseMove",
  "OnMacSizeChange" = "OnMacSizeChange",
  "OnMetaCall" = "OnMetaCall",
  "OnModifiedChange" = "OnModifiedChange",
  "OnMouseButtonDblClick" = "OnMouseButtonDblClick",
  "OnMouseButtonPress" = "OnMouseButtonPress",
  "OnMouseButtonRelease" = "OnMouseButtonRelease",
  "OnMouseMove" = "OnMouseMove",
  "OnMouseTrackingChange" = "OnMouseTrackingChange",
  "OnMove" = "OnMove",
  "OnNativeGesture" = "OnNativeGesture",
  "OnOrientationChange" = "OnOrientationChange",
  "OnPaint" = "OnPaint",
  "OnPaletteChange" = "OnPaletteChange",
  "OnParentAboutToChange" = "OnParentAboutToChange",
  "OnParentChange" = "OnParentChange",
  "OnPlatformPanel" = "OnPlatformPanel",
  "OnPlatformSurface" = "OnPlatformSurface",
  "OnPolish" = "OnPolish",
  "OnPolishRequest" = "OnPolishRequest",
  "OnQueryWhatsThis" = "OnQueryWhatsThis",
  "OnReadOnlyChange" = "OnReadOnlyChange",
  "OnRequestSoftwareInputPanel" = "OnRequestSoftwareInputPanel",
  "OnResize" = "OnResize",
  "OnScrollPrepare" = "OnScrollPrepare",
  "OnScroll" = "OnScroll",
  "OnShortcut" = "OnShortcut",
  "OnShortcutOverride" = "OnShortcutOverride",
  "OnShow" = "OnShow",
  "OnShowToParent" = "OnShowToParent",
  "OnSockAct" = "OnSockAct",
  "OnStateMachineSignal" = "OnStateMachineSignal",
  "OnStateMachineWrapped" = "OnStateMachineWrapped",
  "OnStatusTip" = "OnStatusTip",
  "OnStyleChange" = "OnStyleChange",
  "OnTabletMove" = "OnTabletMove",
  "OnTabletPress" = "OnTabletPress",
  "OnTabletRelease" = "OnTabletRelease",
  "OnTabletEnterProximity" = "OnTabletEnterProximity",
  "OnTabletLeaveProximity" = "OnTabletLeaveProximity",
  "OnTabletTrackingChange" = "OnTabletTrackingChange",
  "OnThreadChange" = "OnThreadChange",
  "OnTimer" = "OnTimer",
  "OnToolBarChange" = "OnToolBarChange",
  "OnToolTip" = "OnToolTip",
  "OnToolTipChange" = "OnToolTipChange",
  "OnTouchBegin" = "OnTouchBegin",
  "OnTouchCancel" = "OnTouchCancel",
  "OnTouchEnd" = "OnTouchEnd",
  "OnTouchUpdate" = "OnTouchUpdate",
  "OnUngrabKeyboard" = "OnUngrabKeyboard",
  "OnUngrabMouse" = "OnUngrabMouse",
  "OnUpdateLater" = "OnUpdateLater",
  "OnUpdateRequest" = "OnUpdateRequest",
  "OnWhatsThis" = "OnWhatsThis",
  "OnWhatsThisClicked" = "OnWhatsThisClicked",
  "OnWheel" = "OnWheel",
  "OnWinEventAct" = "OnWinEventAct",
  "OnWindowActivate" = "OnWindowActivate",
  "OnWindowBlocked" = "OnWindowBlocked",
  "OnWindowDeactivate" = "OnWindowDeactivate",
  "OnWindowIconChange" = "OnWindowIconChange",
  "OnWindowStateChange" = "OnWindowStateChange",
  "OnWindowTitleChange" = "OnWindowTitleChange",
  "OnWindowUnblocked" = "OnWindowUnblocked",
  "OnChangeId" = "OnChangeId",
  "OnZOrderChange" = "OnZOrderChange",
}
