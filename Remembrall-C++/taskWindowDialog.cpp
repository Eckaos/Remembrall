#include "taskWindowDialog.hpp"
#include <QLayout>

TaskDialog::TaskDialog(QWidget *parent) : QDialog(parent){
	nameTaskEdit = new QLineEdit();
	dateTaskEdit = new QDateEdit();
	validateButton = new QPushButton(tr("Validate"));
	cancelButton = new QPushButton(tr("Cancel"));
	
	dateTaskEdit->setDate(QDate::currentDate());

	QVBoxLayout* mainLayout = new QVBoxLayout(); 
	QHBoxLayout* buttonLayout = new QHBoxLayout();
	mainLayout->addWidget(nameTaskEdit);
	mainLayout->addWidget(dateTaskEdit);

	buttonLayout->addWidget(validateButton);
	buttonLayout->addWidget(cancelButton);
	mainLayout->addLayout(buttonLayout);

	setLayout(mainLayout);
	setWindowTitle("Task Creator");	
	layout()->setSizeConstraint(QLayout::SetFixedSize);

	connect(validateButton, SIGNAL(released()), this,SLOT(onValidateButtonReleased()));
	connect(cancelButton, SIGNAL(released()), this, SLOT(onCancelButtonReleased()));
}

TaskDialog::~TaskDialog(){
	delete nameTaskEdit;
	delete nameTaskEdit;
	delete validateButton;
	delete cancelButton;
}

QLineEdit* TaskDialog::getNameTaskEdit(){
	return nameTaskEdit;
}

QDateEdit* TaskDialog::getDateTaskEdit(){
	return dateTaskEdit;
}

void TaskDialog::onValidateButtonReleased(){
	if(nameTaskEdit->text() != ""){
		emit validate(nameTaskEdit->text(), dateTaskEdit->date());
		nameTaskEdit->clear();
		close();
	}
}

void TaskDialog::onCancelButtonReleased(){
	close();
}
