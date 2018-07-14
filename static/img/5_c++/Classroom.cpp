// Author: Jeffrey Hui

#include "Classroom.h"
#include <iostream> // input/output, part of STD library

using namespace std;

//first conditional checks for error bound messages, User cannot input a seatNumber more than 256 or less than 1
bool Classroom::reserveSeat(int seatNumber){
	if(seatNumber > 256 || seatNumber < 1){
		cout << "seat does not exist" << endl;
		return false;
	}
	if(!checkSeatStatus(seatNumber)) {
		//since a seat has now been reserved, decrement a freeseat.
		numberOfFreeSeats--;
		//subtract 1 because the index of seatNumber starts at 0 and go to 255
		seats[seatNumber-1] = true;
		cout << "successfully reserved seat number " << seatNumber << endl;
	}
	return true;
}

bool Classroom::freeSeat(int seatNumber){
	if(seatNumber > 256 || seatNumber < 1){ 	//error checking
		cout << "seat does not exist" << endl;
		return false;
	}
	if(checkSeatStatus(seatNumber)) {
		//since a seat has been freed, the number of free seats obviously goes up
		numberOfFreeSeats++; 
		seats[seatNumber-1] = false;
		cout << "successfully freed seat " << seatNumber << endl;
	}
	return true;
}

bool Classroom::checkSeatStatus(int seatNumber){
	if(seatNumber > 256 || seatNumber < 1){
		cout << "seat does not exist" << endl;
		return false;
	}
	// true means that seat is taken
	if (seats[seatNumber-1]){
		cout << "seat number " << seatNumber << " is taken" << endl;
	// false means that seat is empty
	}else{
		cout << "seat number " << seatNumber << " is free" << endl;
	}
	
	return seats[seatNumber-1];
}

// returns 256 seats
int Classroom::getNumberOfFreeSeats(){
	return numberOfFreeSeats;
}