#ifndef TASK
#define TASK

#include <QString>
#include <QDate>
#include <QVariant>
#include <QJsonObject>
#include <iostream>

class Task{
	
	public:
		Task() = default;
		~Task() = default;
		Task(const Task &) = default;
		Task &operator=(const Task &t)= default;
		Task(QString n, QDate d);
		
		QString getName()const;
		QDate getDate()const;
		void setName(QString s);
		void setDate(QDate d);
		void read(const QJsonObject &json);
		void write(QJsonObject &json);
		
	private:
		QString name;
		QDate date;
		friend bool operator==(const Task &a, const Task &b){
			return (a.name == b.name && a.date == b.date);
		};
		friend QDebug operator<<(QDebug os, const Task& t){
			os.nospace() << t.date.toString("dd/MM/yyyy") << " - " << t.name;
			return os.maybeSpace();
		}

};
Q_DECLARE_METATYPE(Task);

#endif
