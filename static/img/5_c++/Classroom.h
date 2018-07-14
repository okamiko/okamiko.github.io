// Author: Jeffrey Hui

#ifndef CLASSROOM_H_
#define CLASSROOM_H_

class Classroom {
	
	private:
		//Initialize a Boolean Array of Seats. True = Seat is Taken, False = Seat is Empty
		bool seats[256] = { false }; 
		// Total free seats
		int numberOfFreeSeats = 256;

	public:
		Classroom(){}
		 bool reserveSeat(int seatNumber);
		 bool freeSeat(int seatNumber);
		 bool checkSeatStatus(int seatNumber);
		 int getNumberOfFreeSeats();
		~Classroom(){}
};
#endif