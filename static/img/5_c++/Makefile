GPP = g++ -g -O0 -Wall -Wextra -std=gnu++11

all: main

main: main.o Classroom.o ClassroomManager.o
	${GPP} main.o Classroom.o ClassroomManager.o -o main

%.o: %.cpp
	${GPP} -c $<

clean:
	- rm *.o main 

main.o: main.cpp Classroom.h ClassroomManager.h
Classroom.o: Classroom.cpp Classroom.h ClassroomManager.cpp ClassroomManager.h 