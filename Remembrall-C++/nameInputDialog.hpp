#ifndef NAME_INPUT_DIALOG
#define NAME_INPUT_DIALOG

#include <QDialog>
#include <QLabel>
#include <QLineEdit>
#include <QPushButton>

class NameInputDialog : public QDialog{
	Q_OBJECT
	public:
		NameInputDialog(QString s,QWidget *parent= nullptr);
		~NameInputDialog();

	signals:
		void validate(QString s);

	private:
		QLineEdit *nameEdit;
		QPushButton *validateButton;
		QPushButton *cancelButton;

	private slots:
		void onValidateButtonReleased();
		void onCancelButtonReleased();

};

#endif
