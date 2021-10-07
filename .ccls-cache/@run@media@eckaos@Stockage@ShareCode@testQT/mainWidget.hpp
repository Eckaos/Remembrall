#ifndef MAINWIDGET
#define MAINWIDGET

#include <QWidget>
#include "agenda.hpp"
#include "jsonFileList.hpp"
#include <QItemSelection>

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

	private:
		QPushButton* newAgendaButton;
		QPushButton* deleteAgendaButton;
		QLineEdit* nameAgendaLine;
		
		QPushButton* newTaskButton;
		QPushButton* deleteTaskButton;
		QLineEdit* taskTitleLine;
		QDateEdit* taskDatePicker;
		
		QListView* taskListView;
		QListView* agendaListView;

		QList<Agenda*> agendaModelList;
		JsonFileList* fileList;
		Agenda* currentAgenda;
};

#endif
