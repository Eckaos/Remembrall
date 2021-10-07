#ifndef DATE 
#define DATE

#include "json.hpp"
#include <iostream>

using json = nlohmann::json;

namespace t{
	class Date{
		private :
			int day;
			int month;
			int year;
		public :
			Date();
			Date(int d, int m, int y);
			int getDay() const;
			int getMonth()const;
			int getYear()const;
			NLOHMANN_DEFINE_TYPE_INTRUSIVE(Date,day,month,year)
			friend bool operator==(const Date& a, const Date& b){
				return (a.day == b.getDay() && a.getMonth() == b.getMonth() && a.getYear() == b.getYear());
			}
			friend std::ostream& operator<<(std::ostream& os, const Date& date){
				return os << date.day << "/" << date.month << "/" << date.year;
			}
			friend std::istream& operator>>(std::istream& is, Date& date){
				return is >> date.day >> date.month >> date.year;
			}
	};
	void to_json(json& j, const Date& d);
	void from_json(const json& j, Date& d);
}
#endif
