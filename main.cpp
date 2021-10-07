#include <QApplication>
#include <mainWidget.hpp>
#include <QScreen>

int main(int argc, char *argv[]){
	QApplication app(argc, argv);
	MainWidget w;	
	QRect rec = app.primaryScreen()->availableGeometry();
	w.resize(rec.width(),rec.height());
	w.show();

	return app.exec();
}
