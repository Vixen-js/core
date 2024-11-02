cmake_minimum_required(VERSION 3.1)

include(./config/base.cmake)
include(./config/qt.cmake)
include(./config/node_api.cmake)
include(./config/qode.cmake)

set(ADDON_NAME "vixen_core")
project(${ADDON_NAME})
set(CMAKE_BUILD_WITH_INSTALL_RPATH ON)

# To Take into account: CMake + moc also use this list when finding files which `moc` is applied.

add_library(${ADDON_NAME} SHARED
    "${CMAKE_JS_SRC}"
    "${PROJECT_SOURCE_DIR}/src/cpp/vixen.cpp"
    # Internal Components
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/Extras/Utils/nutils.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/Integration/integration.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/FlexLayout/flexutils.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/FlexLayout/flexlayout.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/FlexLayout/flexitem.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/YogaWidget/nodestyle.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/Events/eventsmap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/Events/eventwidget.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/YogaWidget/yogawidget.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/core/WrapperCache/wrappercache.h"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/WrapperCache/wrappercache.cpp"
    # core deps
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/log.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/Utils.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGConfig.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGEnums.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGLayout.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGNode.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGNodePrint.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGStyle.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/YGValue.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/Yoga.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/event/event.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps/yoga/internal/experiments.cpp"
    # Wrapped Components
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QBrush/qbrush_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QPen/qpen_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QColor/qcolor_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QApplication/qapplication_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QClipboard/qclipboard_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QDrag/qdrag_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QKeyEvent/qkeyevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QMouseEvent/qmouseevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QMoveEvent/qmoveevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QWheelEvent/qwheelevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QNativeGestureEvent/qnativegestureevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QPaintEvent/qpaintevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QTabletEvent/qtabletevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QTimerEvent/qtimerevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QDropEvent/qdropevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QDragEnterEvent/qdragenterevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QDragMoveEvent/qdragmoveevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QDragLeaveEvent/qdragleaveevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QResizeEvent/qresizeevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QInputMethodEvent/qinputmethodevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QEvent/QInputMethodQueryEvent/qinputmethodqueryevent_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QFontDatabase/qfontdatabase_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QFontMetrics/qfontmetrics_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QFontMetricsF/qfontmetricsf_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QPicture/qpicture_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QPixmap/qpixmap_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QIcon/qicon_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QImage/qimage_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QFont/qfont_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QCursor/qcursor_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QKeySequence/qkeysequence_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QMovie/qmovie_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QPalette/qpalette_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QScreen/qscreen_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QStyle/qstyle_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtGui/QWindow/qwindow_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QAbstractItemModel/qabstractitemmodel_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QDate/qdate_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QDateTime/qdatetime_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QItemSelectionModel/qitemselectionmodel_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QModelIndex/qmodelindex_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QObject/qobject_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QVariant/qvariant_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QSize/qsize_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QSizeF/qsizef_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QSettings/qsettings_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QRect/qrect_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QRectF/qrectf_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QPoint/qpoint_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QPointF/qpointf_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QTime/qtime_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QUrl/qurl_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtCore/QMimeData/qmimedata_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QWidget/qwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QDialog/qdialog_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QBoxLayout/qboxlayout_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QCalendarWidget/qcalendarwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QColorDialog/qcolordialog_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QComboBox/qcombobox_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QDateEdit/qdateedit_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QDateTimeEdit/qdatetimeedit_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QDoubleSpinBox/qdoublespinbox_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QErrorMessage/qerrormessage_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QFileDialog/qfiledialog_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QFontDialog/qfontdialog_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QFrame/qframe_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QGraphicsBlurEffect/qgraphicsblureffect_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QGraphicsDropShadowEffect/qgraphicsdropshadoweffect_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QHeaderView/qheaderview_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QListView/qlistview_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QListWidget/qlistwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QListWidgetItem/qlistwidgetitem_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTableView/qtableview_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTableWidget/qtablewidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTableWidgetItem/qtablewidgetitem_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QPainter/qpainter_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QPainterPath/qpainterpath_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QGridLayout/qgridlayout_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QDial/qdial_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QLabel/qlabel_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QLayout/qlayout_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QLCDNumber/qlcdnumber_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QMainWindow/qmainwindow_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QPushButton/qpushbutton_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QToolButton/qtoolbutton_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QSpinBox/qspinbox_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QCheckBox/qcheckbox_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QProgressBar/qprogressbar_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QProgressDialog/qprogressdialog_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QRadioButton/qradiobutton_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QStackedLayout/qstackedlayout_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QStackedWidget/qstackedwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTabBar/qtabbar_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTabWidget/qtabwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QLineEdit/qlineedit_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QPlainTextEdit/qplaintextedit_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QScrollArea/qscrollarea_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QScrollBar/qscrollbar_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QSystemTrayIcon/qsystemtrayicon_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QAction/qaction_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QShortcut/qshortcut_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QMenuBar/qmenubar_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QMenu/qmenu_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QGroupBox/qgroupbox_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QSlider/qslider_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTimeEdit/qtimeedit_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTreeWidget/qtreewidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTreeWidgetItem/qtreewidgetitem_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QMessageBox/qmessagebox_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QInputDialog/qinputdialog_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QButtonGroup/qbuttongroup_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QStatusBar/qstatusbar_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/core/FlexLayout/flexlayout_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTextBrowser/qtextbrowser_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QTextEdit/qtextedit_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QStandardItemModel/qstandarditemmodel_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QStandardItem/qstandarditem_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QSvgWidget/qsvgwidget_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QStyleFactory/qstylefactory_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QSplitter/qsplitter_wrap.cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/lib/QtWidgets/QAbstractItemDelegate/qabstractitemdelegate_wrap.cpp"
    # Custom widgets
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtCore/QAbstractItemModel/nabstractitemmodel.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtCore/QItemSelectionModel/nitemselectionmodel.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtCore/QObject/nobject.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/core/FlexLayout/flexlayout.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtGui/QMovie/nmovie.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtGui/QApplication/napplication.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtGui/QDrag/ndrag.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QWidget/nwidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QDialog/ndialog.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QLabel/nlabel.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QCalendarWidget/ncalendarwidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QCheckBox/ncheckbox.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QColorDialog/ncolordialog.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QDateEdit/ndateedit.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QDateTimeEdit/ndatetimeedit.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QDial/ndial.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QDoubleSpinBox/ndoublespinbox.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QErrorMessage/nerrormessage.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QFileDialog/nfiledialog.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QFontDialog/nfontdialog.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QFrame/nframe.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QGraphicsBlurEffect/ngraphicsblureffect.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QGraphicsDropShadowEffect/ngraphicsdropshadoweffect.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QLCDNumber/nlcdnumber.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QListView/nlistview.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QListWidget/nlistwidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTableView/ntableview.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTableWidget/ntablewidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QLineEdit/nlineedit.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QMainWindow/nmainwindow.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QProgressBar/nprogressbar.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QProgressDialog/nprogressdialog.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QPushButton/npushbutton.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QMessageBox/nmessagebox.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QInputDialog/ninputdialog.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QToolButton/ntoolbutton.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QSpinBox/nspinbox.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QRadioButton/nradiobutton.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QPlainTextEdit/nplaintextedit.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QScrollArea/nscrollarea.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QScrollBar/nscrollbar.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QStackedLayout/nstackedlayout.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QStackedWidget/nstackedwidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTabBar/ntabbar.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTabWidget/ntabwidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QSystemTrayIcon/nsystemtrayicon.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QAction/naction.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QShortcut/nshortcut.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QMenuBar/nmenubar.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QMenu/nmenu.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QLayout/nlayout.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QGridLayout/ngridlayout.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QBoxLayout/nboxlayout.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QComboBox/ncombobox.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QGroupBox/ngroupbox.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QSlider/nslider.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTimeEdit/ntimeedit.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTreeWidget/ntreewidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QButtonGroup/nbuttongroup.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QStatusBar/nstatusbar.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QStandardItemModel/nstandarditemmodel.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTextBrowser/ntextbrowser.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QTextEdit/ntextedit.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QSvgWidget/nsvgwidget.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QHeaderView/nheaderview.hpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen/QtWidgets/QSplitter/nsplitter.hpp"
)

AddBaseConfig(${ADDON_NAME})
AddQtSetup(${ADDON_NAME})
AddNodeApiSupport(${ADDON_NAME})

target_include_directories(${ADDON_NAME} PRIVATE
    "${CMAKE_JS_INC}"
    "${PROJECT_SOURCE_DIR}"
    "${PROJECT_SOURCE_DIR}/src/cpp"
    "${PROJECT_SOURCE_DIR}/src/cpp/include"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/deps"
    "${PROJECT_SOURCE_DIR}/src/cpp/include/vixen"
)

if(WIN32)
    
    add_definitions(/bigobj)
    target_compile_definitions(${ADDON_NAME} PRIVATE
        ENABLE_DLL_EXPORT=1
    )
    target_compile_options(${ADDON_NAME} PRIVATE "/MP")

endif(WIN32)

if (UNIX AND NOT APPLE)
    # Set the RPATH in the binary to a relative one to allow it to find our Qt
    # libraries regardless of where the base installation directory is.
    file(RELATIVE_PATH QT_LIBRARY_REL_PATH "${CMAKE_BINARY_DIR}/Release" "${QT_CMAKE_HOME_DIR}/../..")
    set_target_properties(${ADDON_NAME} PROPERTIES INSTALL_RPATH "\$ORIGIN/${QT_LIBRARY_REL_PATH}")
    set_target_properties(${ADDON_NAME} PROPERTIES BUILD_WITH_INSTALL_RPATH TRUE)
endif()

if (APPLE)

    set(CMAKE_OSX_DEPLOYMENT_TARGET "10.15")
    set(CMAKE_MACOSX_RPATH ON)
    file(RELATIVE_PATH QT_LIBRARY_REL_PATH "${CMAKE_BINARY_DIR}/Release" "${QT_CMAKE_HOME_DIR}/../..")
    set_target_properties(${ADDON_NAME} PROPERTIES INSTALL_RPATH "@loader_path/${QT_LIBRARY_REL_PATH}")

endif()

target_link_libraries(${ADDON_NAME} PRIVATE
    "${CMAKE_JS_LIB}"
    Qt6::Widgets
    Qt6::Core
    Qt6::Gui
    Qt6::Svg
    Qt6::SvgWidgets
)