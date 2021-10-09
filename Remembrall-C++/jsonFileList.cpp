#include "jsonFileList.hpp"
#include <QJsonDocument>
#include <QDir>

JsonFileList::JsonFileList(QString dirPath){
	if(!QDir().exists(dirPath)){
		QDir().mkdir(dirPath);	
	}
	dir.setPath(dirPath);
}

int JsonFileList::rowCount(const QModelIndex &parent)const{
	Q_UNUSED(parent);
	return fileList.size();
}

QVariant JsonFileList::data(const QModelIndex &index, int role)const{
	if(!index.isValid()){
		return QVariant();
	}
	if(index.row() >= fileList.size()){
		return QVariant();
	}
	if(role == Qt::DisplayRole){
		return fileList.at(index.row()).baseName();
	}else{
		return QVariant();
	}
}

void JsonFileList::addFile(QString &fileName){
	if(QFile(dir.path()+"/"+fileName+".json").exists() || fileName == NULL || fileName == ""){
		return;
	}
	QFile fileToAdd(dir.path()+"/"+fileName+".json");
	fileToAdd.open(QIODevice::NewOnly);
	fileToAdd.close();
	fileList.append(QFileInfo(fileToAdd));
	emit dataChanged(QModelIndex(), QModelIndex(), {Qt::EditRole});
}

void JsonFileList::deleteFile(QString &fileName){
	QFileInfo f(dir.path()+"/"+fileName);
	if(fileList.contains(f)){
		fileList.removeAll(f);
		dir.remove(fileName);
		emit dataChanged(QModelIndex(), QModelIndex(), {Qt::EditRole});
	}
}

void JsonFileList::loadAllFile(){
	dir.setFilter(QDir::Files);
	dir.setSorting(QDir::Name);
	fileList = dir.entryInfoList();		
}

QJsonObject JsonFileList::loadAgenda(QString fileName){
	QFile file(dir.path()+"/"+fileName+".json");	
	file.open(QIODevice::ReadWrite);
	QByteArray byteData = file.readAll();
	QJsonDocument jDoc = QJsonDocument::fromJson(byteData);
	return jDoc.object();
}

QFileInfoList JsonFileList::getFileList(){
	return fileList;
}

void JsonFileList::loadAllAgendas(QList<Agenda*>& agendas){
	for(QFileInfo f : fileList){
		Agenda* a = new Agenda;
		a->read(loadAgenda(f.baseName()));
		agendas.append(a);	
	}
}
