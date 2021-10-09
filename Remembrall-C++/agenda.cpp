#include "agenda.hpp"
#include <QJsonArray>

Agenda::Agenda(){}

void Agenda::addTask(Task &t){
	taskList.append(t);
	emit dataChanged(QModelIndex(),QModelIndex(), {Qt::EditRole});
}

void Agenda::deleteTask(Task &t){
	taskList.erase(taskList.begin()+taskList.indexOf(t));
	emit dataChanged(QModelIndex(), QModelIndex(), {Qt::EditRole});	
}

QList<Task> Agenda::getTaskList(){
	return taskList;
}

int Agenda::rowCount(const QModelIndex &parent)const{
	Q_UNUSED(parent);
	return taskList.size();
}

QVariant Agenda::data(const QModelIndex &index, int role)const{
	if(!index.isValid()){
		return QVariant();
	}
	if(index.row() >= taskList.size()){
		return QVariant();
	}
	if(role == Qt::DisplayRole){
		Task t = taskList.at(index.row());
		return QString(t.getDate().toString("dd/MM/yyyy")+" - "+ t.getName());
	}else{
		return QVariant();
	}
}

void Agenda::read(const QJsonObject &json){
	if(json.contains("Tasks") && json["Tasks"].isArray()){
		QJsonArray taskArray = json["Tasks"].toArray();
		taskList.clear();
		taskList.reserve(taskArray.size());
		for(int index = 0; index < taskArray.size(); ++index){
			QJsonObject taskObject = taskArray[index].toObject();
			Task t;
			t.read(taskObject);
			taskList.append(t);
		}
	}
}

void Agenda::write(QJsonObject &json)const{
	QJsonArray taskArray;
	for(Task t : taskList){
		QJsonObject taskObject;
		t.write(taskObject);
		taskArray.append(taskObject);
	}
	json["Tasks"] = taskArray;
}
