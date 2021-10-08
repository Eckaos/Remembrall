#include <QtWidgets>
#include <QDebug>
#include <QPoint>
#include "mainWidget.hpp"
#include <QVariant>

MainWidget::MainWidget(QWidget *parent) : QWidget(parent){
	newAgendaButton = new QPushButton(tr("+"));	
	deleteAgendaButton = new QPushButton(tr("-"));
	
	newTaskButton = new QPushButton(tr("New Task"));
	deleteTaskButton = new QPushButton(tr("Delete Task"));

	taskListView = new QListView();
	agendaListView = new QListView();

	taskDialog = new TaskDialog();
	agendaDialog = new NameInputDialog("Agenda");

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
	
	toolBarTask->addWidget(newTaskButton);
	toolBarTask->addWidget(deleteTaskButton);

	toolBar->addLayout(toolBarAgenda, 10);
	toolBar->addLayout(toolBarTask, 90);

	mainLayout->addLayout(listBox);
	mainLayout->addLayout(toolBar);

	fileList = new JsonFileList();
	fileList->loadAllFile();
	fileList->loadAllAgendas(agendaModelList);
	agendaListView->setModel(fileList);

	setLayout(mainLayout);

	setWindowTitle(tr("Agenda"));
	
	connect(newTaskButton, SIGNAL(released()), this, SLOT(onNewTaskButtonReleased()));
	connect(deleteTaskButton, SIGNAL(released()), this, SLOT(onDeleteTaskButtonReleased()));

	connect(newAgendaButton, SIGNAL(released()), this, SLOT(onNewAgendaButtonReleased()));
	connect(deleteAgendaButton,SIGNAL(released()),this, SLOT(onDeleteAgendaButtonReleased()));
	connect(agendaListView->selectionModel(), SIGNAL(selectionChanged(QItemSelection, QItemSelection)), this, SLOT(onAgendaClick(QItemSelection)));
	connect(taskDialog, SIGNAL(validate(QString, QDate)), this ,SLOT(createTask(QString, QDate)));
	connect(agendaDialog, SIGNAL(validate(QString)), this, SLOT(createAgenda(QString)));
}



MainWidget::~MainWidget(){
	delete newTaskButton;
	delete deleteTaskButton;

	delete newAgendaButton;
	delete deleteAgendaButton;
	
	delete taskListView;
	delete agendaListView;
	qDeleteAll(agendaModelList);
	agendaModelList.clear();
	delete agendaDialog;
	delete taskDialog;
}

void MainWidget::onNewTaskButtonReleased(){
	taskDialog->open();
}

void MainWidget::onDeleteTaskButtonReleased(){
	QString s = taskListView->currentIndex().data().toString();
	QDate d = QDate::fromString(s.section(' ',0,0), "dd/MM/yyyy");
	s = s.section('-',1,1).trimmed();
	Task t(s,d);
	currentAgenda->deleteTask(t);
	QFile file("json/"+agendaListView->currentIndex().data().toString()+".json");
	file.open(QIODevice::WriteOnly);
	QJsonObject jObj = QJsonDocument().object();
	currentAgenda->write(jObj);
	file.write(QJsonDocument(jObj).toJson());	
}

void MainWidget::onAgendaClick(QItemSelection item){
	if(!item.indexes().isEmpty()){
		taskListView->setModel(agendaModelList.at(agendaListView->currentIndex().row()));
		currentAgenda = agendaModelList.at(agendaListView->currentIndex().row());
	}
}

void MainWidget::onNewAgendaButtonReleased(){
	agendaDialog->open();
}

void MainWidget::onDeleteAgendaButtonReleased(){
	int index = agendaListView->selectionModel()->currentIndex().row();
	QString s(fileList->getFileList().at(index).fileName());
	fileList->deleteFile(s);
	agendaModelList.removeAt(index);
}

void MainWidget::createTask(QString s, QDate d){
	if(currentAgenda != NULL && s!=""&& s != NULL){
		Task t(s,d);
		currentAgenda->addTask(t);
		QFile file("json/"+agendaListView->currentIndex().data().toString()+".json");
		file.open(QIODevice::WriteOnly);
		QJsonObject jObj = QJsonDocument().object();
		currentAgenda->write(jObj);
		file.write(QJsonDocument(jObj).toJson());
	}
}

void MainWidget::createAgenda(QString s){
	if(s != "" && s != NULL){
		fileList->addFile(s);
		Agenda* a = new Agenda;
		a->read(fileList->loadAgenda(s));
		agendaModelList.append(a);	
	}
}
