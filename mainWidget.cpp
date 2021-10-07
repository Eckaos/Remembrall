#include <QtWidgets>
#include <QDebug>
#include <QPoint>
#include "mainWidget.hpp"
#include <QVariant>

MainWidget::MainWidget(QWidget *parent) : QWidget(parent){
	newAgendaButton = new QPushButton(tr("+"));	
	deleteAgendaButton = new QPushButton(tr("-"));
	nameAgendaLine = new QLineEdit();
	
	newTaskButton = new QPushButton(tr("New Task"));
	deleteTaskButton = new QPushButton(tr("Delete Task"));
	taskTitleLine = new QLineEdit();
	taskDatePicker = new QDateEdit();

	taskListView = new QListView();
	agendaListView = new QListView();

	QVBoxLayout *mainLayout = new QVBoxLayout();
	QHBoxLayout *listBox = new QHBoxLayout();
	QHBoxLayout *toolBar = new QHBoxLayout();
	QVBoxLayout *toolBarAgenda = new QVBoxLayout();
	QHBoxLayout *toolBarTask = new QHBoxLayout();
	QHBoxLayout *buttonsBarAgenda = new QHBoxLayout();

	listBox->addWidget(agendaListView, 10);
	listBox->addWidget(taskListView, 90);

	buttonsBarAgenda->addWidget(newAgendaButton);
	buttonsBarAgenda->addWidget(deleteAgendaButton);
	
	toolBarAgenda->addLayout(buttonsBarAgenda);
	toolBarAgenda->addWidget(nameAgendaLine);
	
	toolBarTask->addWidget(newTaskButton);
	toolBarTask->addWidget(deleteTaskButton);
	toolBarTask->addWidget(taskTitleLine);
	toolBarTask->addWidget(taskDatePicker);

	toolBar->addLayout(toolBarAgenda, 10);
	toolBar->addLayout(toolBarTask, 90);

	mainLayout->addLayout(listBox);
	mainLayout->addLayout(toolBar);

	fileList = new JsonFileList();
	fileList->loadAllFile();
	fileList->loadAllAgendas(agendaModelList);
	agendaListView->setModel(fileList);

	setLayout(mainLayout);

	taskDatePicker->setDate(QDate::currentDate());
	
	setWindowTitle(tr("Agenda"));
	
	connect(newTaskButton, SIGNAL(released()), this, SLOT(onNewTaskButtonReleased()));
	connect(deleteTaskButton, SIGNAL(released()), this, SLOT(onDeleteTaskButtonReleased()));

	connect(newAgendaButton, SIGNAL(released()), this, SLOT(onNewAgendaButtonReleased()));
	connect(deleteAgendaButton,SIGNAL(released()),this, SLOT(onDeleteAgendaButtonReleased()));
	connect(agendaListView->selectionModel(), SIGNAL(selectionChanged(QItemSelection, QItemSelection)), this, SLOT(onAgendaClick(QItemSelection)));
}



MainWidget::~MainWidget(){
	delete newTaskButton;
	delete deleteTaskButton;
	delete taskTitleLine;
	delete taskDatePicker;

	delete newAgendaButton;
	delete deleteAgendaButton;
	delete nameAgendaLine;
	
	delete taskListView;
	delete agendaListView;
	qDeleteAll(agendaModelList);
	agendaModelList.clear();
}

void MainWidget::onNewTaskButtonReleased(){
	if(currentAgenda != NULL && taskTitleLine->text() != ""){
		Task t;
		t.setDate(taskDatePicker->date());
		t.setName(taskTitleLine->text());
		currentAgenda->addTask(t);	
		taskTitleLine->clear();
		//TODO open file in overwrite get the jsonObject and write it
	}
}

void MainWidget::onDeleteTaskButtonReleased(){
	QString s = taskListView->currentIndex().data().toString();
	QDate d = QDate::fromString(s.section(' ',0,0), "dd/MM/yyyy");
	s = s.section('-',1,1).trimmed();
	Task t(s,d);
	currentAgenda->deleteTask(t);
}

void MainWidget::onAgendaClick(QItemSelection item){
	if(!item.indexes().isEmpty()){
		taskListView->setModel(agendaModelList.at(agendaListView->currentIndex().row()));
		currentAgenda = agendaModelList.at(agendaListView->currentIndex().row());
	}		
}

void MainWidget::onNewAgendaButtonReleased(){
	QString s(nameAgendaLine->text());
	fileList->addFile(s);
	nameAgendaLine->clear();
	Agenda* a = new Agenda;
	a->read(fileList->loadAgenda(s));
	agendaModelList.append(a);	
}

void MainWidget::onDeleteAgendaButtonReleased(){
	int index = agendaListView->selectionModel()->currentIndex().row();
	QString s(fileList->getFileList().at(index).fileName());
	fileList->deleteFile(s);
	agendaModelList.removeAt(index);
}
