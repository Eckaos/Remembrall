#include "date.hpp"

using namespace t;
Date::Date(){}

Date::Date(int d, int m, int y): day(d), month(m), year(y){}

int Date::getDay()const{
	return day;
}

int Date::getMonth()const{
	return month;
}

int Date::getYear()const{
	return year;
}


