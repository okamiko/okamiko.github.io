// Author: Jeffrey Hui

#ifndef CLASSROOMMANAGER_H_
#define CLASSROOMMANAGER_H_
#include "Classroom.h"

class ClassroomManager{
	
	private:
		// 8 classrooms
	 	Classroom* rooms[8];
	 	int numOfClassrooms = 8;
	
	public: 
		ClassroomManager();
		bool reserveSeatInRoom(int _roomNumber, int _seatNumber);
		bool freeSeatInRoom(int _roomNumber, int _seatNumber);
		bool checkSeatStatusOfRoom(int _roomNumber, int _seatNumber);
		int getNumberOfFreeSeatsInRoom(int _roomNumber);
		int getStudentLocation(int _studentID);	
		~ClassroomManager();
};

#endif