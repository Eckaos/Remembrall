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

		Qt::ItemFlags flags(const QModelIndex &index)const;
		int rowCount(const QModelIndex &parent = QModelIndex())const;
		QVariant data(const QModelIndex &index, int role = Qt::DisplayRole)const;
		bool setData(const QModelIndex &index, const QVariant &value, int role =Qt::EditRole);

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
