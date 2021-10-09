#include <QApplication>
#include "mainWidget.hpp"
#include <QScreen>
#include <QStyleFactory>

int main(int argc, char *argv[]){
	QApplication app(argc, argv);
	MainWidget w;	
	w.setWindowState(Qt::WindowMaximized);
	w.show();
	app.setWindowIcon(QIcon("Remembrall-2-icon.png"));
	
	return app.exec();
}
