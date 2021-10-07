#ifndef AGENDALIST
#define AGENDALIST

#include "agenda.hpp"

class AgendaList : public QAbstractListModel{

	public:
		AgendaList();
		Qt::ItemFlags flags(const QModelIndex &index)const;
		int rowCount(const QModelIndex &parent = QModelIndex())const;
		QVariant data(const QModelIndex &index, int role = Qt::DisplayRole)const;
		bool setData(const QModelIndex &index, const QVariant &value, int role =Qt::EditRole);
		QList<Agenda> getAgendaList();
		void addAgenda(Agenda &a);
		void deleteAgenda(Agenda &a);
		void loadAgendaList();
		void saveAgenda(Agenda &a);

	private:
		void loadAgenda();
		QList<Agenda> agendaList;	
};

#endif
