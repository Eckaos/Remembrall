#include <nameInputDialog.hpp>
#include <QLayout>

NameInputDialog::NameInputDialog(QString s, QWidget *parent) : QDialog(parent){
	nameEdit = new QLineEdit();
	validateButton = new QPushButton(tr("Validate"));
	cancelButton = new QPushButton(tr("Cancel"));

	QVBoxLayout *mainLayout = new QVBoxLayout();
	QHBoxLayout *buttonLayout = new QHBoxLayout();

	buttonLayout->addWidget(validateButton);
	buttonLayout->addWidget(cancelButton);

	mainLayout->addWidget(nameEdit);
	mainLayout->addLayout(buttonLayout);
	
	setLayout(mainLayout);
	setWindowTitle(s+" Creator");	
	layout()->setSizeConstraint(QLayout::SetFixedSize);

	connect(validateButton, SIGNAL(released()), this,SLOT(onValidateButtonReleased()));
	connect(cancelButton, SIGNAL(released()), this, SLOT(onCancelButtonReleased()));
}

NameInputDialog::~NameInputDialog(){
	delete nameEdit;
	delete validateButton;
	delete cancelButton;
}

void NameInputDialog::onValidateButtonReleased(){
	if(nameEdit->text() != ""){
		emit validate(nameEdit->text());
		nameEdit->clear();
		close();
	}
}

void NameInputDialog::onCancelButtonReleased(){
	close();
}
