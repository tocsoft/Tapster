#include "Pump.h"


Pump::Pump(int pinA, int pinB)
{
	_motor = new Motor(pinA, pinB);

	_pullback = 500;
}


Pump::~Pump()
{
	delete _motor;
}

void Pump::loop()
{
	if (this->isRunning())
	{
		long now = millis();
		int direction = _motor->GetDirection();
		if (_endTime > now)
		{

			//digitalWrite(13, HIGH);

			if (direction == _motor->STOPPED)
			{
				_motor->MoveForward();
			}
		}
		else
		{

			//digitalWrite(13, LOW);
			//_endTime = -1;
			if (direction == _motor->FORWARD)
			{
				_endTime = now + _pullback;
				_motor->MoveBackward();
			}
			else
			{
				_motor->StopMoving();
				_endTime = -1;
			}
		}
	}
}


void Pump::setup()
{
	_motor->Setup();
}

void Pump::setup(int pourTime)
{
	this->setup();
	this->setPourTime(pourTime);
}

void Pump::setPourTime(int pourTime)
{
	_pourTime = pourTime;
}

int Pump::getPourTime()
{
	return _pourTime;
}

bool Pump::isRunning()
{
	return _endTime > 0;
}

void Pump::run()
{
	_endTime = millis() + _pourTime;
}
