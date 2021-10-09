#ifndef TASK_WINDOW_DIALOG
#define TASK_WINDOW_DIALOG

#include <QDialog>
#include <QLabel>
#include <QLineEdit>
#include <QDateEdit>
#include <QPushButton>

class QPushButton;

class TaskDialog : public QDialog{
	Q_OBJECT
	public: 	
		TaskDialog(QWidget *parent = nullptr);
		~TaskDialog();
		QLineEdit* getNameTaskEdit();
		QDateEdit* getDateTaskEdit();
	
	signals:
		void validate(QString s, QDate d);	

	private:
		QLineEdit* nameTaskEdit;
		QDateEdit* dateTaskEdit;
		QPushButton* validateButton;
		QPushButton* cancelButton;

	private slots:
		void onValidateButtonReleased();
		void onCancelButtonReleased();

};

#endif
