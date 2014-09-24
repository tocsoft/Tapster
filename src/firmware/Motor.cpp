#include "Motor.h"

Motor::Motor(int pinA, int pinB)
{
	_pinA = pinA;
	_pinB = pinB;
	_isSetup = false;
	_direction = STOPPED;
}

void Motor::MoveForward()
{
	SetDirection(FORWARD);
}

void Motor::MoveBackward()
{
	SetDirection(BACKWARD);
}

void Motor::ReverseDirection()
{
	if (_direction == FORWARD)
	{
		SetDirection(BACKWARD);
	}
	else if (_direction == BACKWARD)
	{
		SetDirection(FORWARD);
	}
}

void Motor::StopMoving()
{
	SetDirection(STOPPED);
}

int Motor::GetDirection()
{
	return _direction;
}

void Motor::SetDirection(int direction)
{
	if (_direction != direction)
	{
		_direction = direction;
		if (direction == FORWARD)
		{
			_direction = FORWARD;
			digitalWrite(_pinA, HIGH);
			digitalWrite(_pinB, LOW);
		}
		else if (direction == BACKWARD)
		{
			_direction = BACKWARD;
			digitalWrite(_pinA, LOW);
			digitalWrite(_pinB, HIGH);
		}
		else
		{
			_direction = STOPPED;
			digitalWrite(_pinA, LOW);
			digitalWrite(_pinB, LOW);
		}
	}
}

void Motor::Setup()
{
	if (!_isSetup)
	{
		_isSetup = true;
		pinMode(_pinA, OUTPUT);
		pinMode(_pinB, OUTPUT);
	}
}

Motor::~Motor()
{
}
