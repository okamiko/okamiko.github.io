// Author: Jeffrey Hui

#include "ClassroomManager.h"
#include <iostream>
using namespace std; 

// Create 8 classrooms
// Constructor
ClassroomManager::ClassroomManager(){
	for(int i = 0; i < numOfClassrooms;i++) {
		rooms[i] = new Classroom();
	}
}

bool ClassroomManager::reserveSeatInRoom(int _roomNumber, int _seatNumber){
	if (_roomNumber > 8 || _roomNumber < 1){
		cout << "room " << _roomNumber << " does not exist" << endl; 
		return false;
	}
	// check to see if Classroom Successfully reserved a Seat in room 
	if (!(rooms[_roomNumber-1]->reserveSeat(_seatNumber))){
		return false;
	}
	return true;
}

bool ClassroomManager::freeSeatInRoom(int _roomNumber, int _seatNumber){
	if (_roomNumber > 8 || _roomNumber < 1){
		cout << "room " << _roomNumber << " does not exist" << endl; 
		return false;
	}
	// check to see if Classroom successfully freed a seat in room
	if (!(rooms[_roomNumber-1]->freeSeat(_seatNumber))){
		return false;
	}
	return true;
}

bool ClassroomManager::checkSeatStatusOfRoom(int _roomNumber, int _seatNumber){
	if (_roomNumber > 8 || _roomNumber < 1){
		cout << "room " << _roomNumber << " does not exist" << endl; 
		return false;
	}
	// check seat stautus. it will either return true or false.
	// if it returns false, that means the seat is free.
	// the negation of false makes THIS statement true, so the "return false" line will run.
	if (!(rooms[_roomNumber-1]->checkSeatStatus(_seatNumber))){
		return false;
	}
	return true;
}

int ClassroomManager::getNumberOfFreeSeatsInRoom(int _roomNumber){
	if (_roomNumber > 8 || _roomNumber < 1){
		cout << "room " << _roomNumber << " does not exist" << endl; 
		return -1;
	}
	// gets the number of free seats in room
	return rooms[_roomNumber-1]->getNumberOfFreeSeats();
}

int ClassroomManager::getStudentLocation(int _studentID){
	if(_studentID > 256 || _studentID < 1 ){
		cout <<"student ID/Number " << _studentID << " does not exist" << endl; 
		return -1;
	}
	//check if student is in class or not
	for (int i =0 ; i < numOfClassrooms ; i++){
		if(rooms[i]->checkSeatStatus(_studentID)){
			return ++i;
		}
	}
	cout <<"student number " << _studentID << " is not in any of the classrooms" << endl; 
	return -1;
}

// destructor
ClassroomManager::~ClassroomManager(){
	for(int i = 0; i < numOfClassrooms;i++){
		delete (rooms[i]);
	}
}