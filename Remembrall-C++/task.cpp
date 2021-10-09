#include "task.hpp"


Task::Task(QString n, QDate d) : name(n), date(d){}

QString Task::getName()const{
	return name;
}

QDate Task::getDate()const{
	return date;
}

void Task::setName(QString s){
	name = s;
}

void Task::setDate(QDate d){
	date = d;
}

void Task::read(const QJsonObject &json){
	if(json.contains("name") && json["name"].isString()){
		name = json["name"].toString();
	}
	if(json.contains("date") && json["date"].isString()){
		date = QDate::fromString(json["date"].toString(), "dd/MM/yyyy");
	}
}

void Task::write(QJsonObject &json){
	json["name"] = name;
	json["date"] = date.toString("dd/MM/yyyy");
}
