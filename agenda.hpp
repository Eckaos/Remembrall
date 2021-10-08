#ifndef AGENDA
#define AGENDA

#include "task.hpp"
#include <QAbstractListModel>

class Agenda : public QAbstractListModel{
	
	public:
		Agenda();
		int rowCount(const QModelIndex &parent = QModelIndex())const;
		QVariant data(const QModelIndex &index, int role = Qt::DisplayRole)const;
		QList<Task> getTaskList();
		void addTask(Task &t);
		void deleteTask(Task &t);
		void read(const QJsonObject &json);
		void write(QJsonObject &json)const;

	private:
		QList<Task> taskList;
		
};

#endif
