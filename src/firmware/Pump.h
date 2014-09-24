#pragma once
#ifndef Pump_H
#define Pump_H

#include <Arduino.h>
#include "Motor.h"

class Pump
{
public:
	Pump(int pinA, int pinB);
	~Pump();

	void setPourTime(int pourTime);
	int getPourTime();
	bool isRunning();
	void run();
	void loop();
	void setup();
	void setup(int pourTime);

private :
	Motor* _motor;
	int _pourTime;
	int _pullback;
	long _endTime;
};

#endif