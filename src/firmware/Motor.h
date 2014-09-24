#pragma once
#ifndef Motor_H
#define Motor_H

#include <Arduino.h>

class Motor
{
public:
	Motor(int pinA, int pinB);
	~Motor();
	void Setup();

	void MoveForward();
	void MoveBackward();
	void StopMoving();
	void ReverseDirection();

	int GetDirection();
	void SetDirection(int direction);

	static const int FORWARD = 1;
	static const int STOPPED = 0;
	static const int BACKWARD = -1;
private:
	void Attach();
	void Dettach();
	int _pinA;
	int _pinB;
	int _direction;
	bool _isSetup; 
};

#endif