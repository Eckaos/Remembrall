#ifndef MAINWIDGET
#define MAINWIDGET

#include <QWidget>
#include "agenda.hpp"
#include "jsonFileList.hpp"
#include <QInputDialog>
#include <QItemSelection>
#include "taskWindowDialog.hpp"
#include "nameInputDialog.hpp"

class QPushButton;
class QListView;
class QLineEdit;
class QDateEdit;
class QTableView;

class MainWidget : public QWidget {
	Q_OBJECT
	public:
		explicit MainWidget(QWidget *parent = 0);
		~MainWidget();
	private slots:
		void onNewTaskButtonReleased();
		void onDeleteTaskButtonReleased();
		void onNewAgendaButtonReleased();
		void onDeleteAgendaButtonReleased();
		void onAgendaClick(QItemSelection item);
		void createTask(QString s, QDate d);
		void createAgenda(QString s);

	private:
		QPushButton* newAgendaButton;
		QPushButton* deleteAgendaButton;
		
		QPushButton* newTaskButton;
		QPushButton* deleteTaskButton;
		
		QListView* taskListView;
		QListView* agendaListView;

		QList<Agenda*> agendaModelList;
		JsonFileList* fileList;
		Agenda* currentAgenda;
		TaskDialog* taskDialog;
		NameInputDialog* agendaDialog;		
};

#endif
