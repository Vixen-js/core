import addon from "../utils/addon";
import { QWidget, QWidgetSignals } from "./QWidget";
import { NativeElement } from "../core/Component";
import {
  QAbstractScrollArea,
  QAbstractScrollAreaSignals,
} from "./QAbstractScrollArea";
import { QTextOptionWrapMode } from "../QtGui/QTextOption";
import { wrapperCache } from "../core/WrapperCache";
import { checkIfNativeElement } from "../utils/helpers";

export interface QPlainTextEditSignals extends QAbstractScrollAreaSignals {
  onTextChange: () => void;
  onBlockCountChange: (blockCount: number) => void;
  onCopyAvailable: (yes: boolean) => void;
  onCursorPositionChange: () => void;
  onModificationChange: (changed: boolean) => void;
  onRedoAvailable: (available: boolean) => void;
  onSelectionChange: () => void;
  onUndoAvailable: (available: boolean) => void;
}

/**

> Used to edit and display plain text.

* **This class is a JS wrapper around Qt's [QPlainTextEdit class](https://doc.qt.io/qt-5/qplaintextedit.html)**

A `QPlainTextEdit` provides ability to add and manipulate native editable text field widgets.

### Example

```javascript
import { QPlainTextEdit } from "@vixen-js/core";

const plainTextEdit = new QPlainTextEdit();
```
 */
export class QPlainTextEdit extends QAbstractScrollArea<QPlainTextEditSignals> {
  constructor(arg?: QWidget<QWidgetSignals> | NativeElement) {
    let native: NativeElement;
    if (checkIfNativeElement(arg)) {
      native = arg as NativeElement;
    } else if (arg != null) {
      const parent = arg as QWidget;
      native = new addon.QPlainTextEdit(parent.native);
    } else {
      native = new addon.QPlainTextEdit();
    }
    super(native);
  }
  setPlainText(text: string | number): void {
    // react:✓
    this.native?.setPlainText(`${text}`);
  }
  setPlaceholderText(text: string): void {
    // react:✓, //TODO:getter
    this.native?.setPlaceholderText(text);
  }
  toPlainText(): string {
    // react:✓
    return this.native?.toPlainText();
  }
  setReadOnly(isReadOnly: boolean): void {
    // react:✓
    this.native?.setReadOnly(isReadOnly);
  }
  clear(): void {
    // react:✓
    this.native?.clear();
  }
  setWordWrapMode(mode: QTextOptionWrapMode): void {
    this.native?.setWordWrapMode(mode);
  }
  wordWrapMode(): QTextOptionWrapMode {
    return this.native?.wordWrapMode();
  }
  setLineWrapMode(mode: LineWrapMode): void {
    this.native?.setLineWrapMode(mode);
  }
  lineWrapMode(): LineWrapMode {
    return this.native?.lineWrapMode();
  }
  insertPlainText(text: string | number): void {
    this.native?.insertPlainText(`${text}`);
  }
}
wrapperCache.registerWrapper("QPlainTextEditWrap", QPlainTextEdit);

export enum LineWrapMode {
  NoWrap,
  WidgetWidth,
}
