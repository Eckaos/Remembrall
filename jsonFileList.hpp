#ifndef JSONFILELIST
#define JSONFILELIST

#include <QString>
#include <QList>
#include <QAbstractListModel>
#include <QFile>
#include <QDir>
#include "agenda.hpp"


class JsonFileList : public QAbstractListModel{

	public:
		JsonFileList(): dir("json"){};

		int rowCount(const QModelIndex &parent = QModelIndex())const;
		QVariant data(const QModelIndex &index, int role = Qt::DisplayRole)const;

		void addFile(QString &fileName);
		void deleteFile(QString &fileName);
		void loadAllFile();
		QJsonObject loadAgenda(QString s);
		QFileInfoList getFileList();
		void loadAllAgendas(QList<Agenda*>& a);

	private:
		QFileInfoList fileList;
		QDir dir;

};

#endif
