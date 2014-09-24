#include "Motor.h"
#include "Pump.h"


Pump pump1 = Pump(0, 1);
Pump pump2 = Pump(2, 3);
int buttonPin = 8;


// the setup routine runs once when you press reset:
void setup() {

	pinMode(buttonPin, INPUT);
	pump1.setup(3000);
	pump2.setup(2000);

	Serial.begin(9600);
	//while (!Serial) {
		//; // wait for serial port to connect. Needed for Leonardo only
	//}

}

boolean requestRun = false;

boolean canRun = true;



boolean wasRunning = false;
// the loop routine runs over and over again forever:
void loop()
{
	serial();
	button();

	boolean isRunning = pump1.isRunning() | pump2.isRunning();

	if (wasRunning && !isRunning)
	{
		Serial.println("COMPLETE");
	}

	wasRunning = isRunning;

	if (!isRunning)
	{
		if (requestRun)
		{
			Serial.println("STARTED");
			pump1.run();
			pump2.run();
			requestRun = false;
		}
	}

	pump1.loop();
	pump2.loop();
}


int buttonState;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin

// the following variables are long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;    // 

void button(){
	int reading = digitalRead(buttonPin);

	// check to see if you just pressed the button 
	// (i.e. the input went from LOW to HIGH),  and you've waited 
	// long enough since the last press to ignore any noise:  

	// If the switch changed, due to noise or pressing:
	if (reading != lastButtonState) {
		// reset the debouncing timer
		lastDebounceTime = millis();
	}

	if ((millis() - lastDebounceTime) > debounceDelay) {
		// whatever the reading is at, it's been there for longer
		// than the debounce delay, so take it as the actual current state:

		// if the button state has changed:
		if (reading != buttonState) {
			buttonState = reading;

			// only toggle the LED if the new button state is HIGH
			if (buttonState == HIGH) {
				if (canRun){
					requestRun = true;
				}
			}
		}
	}

	// save the reading.  Next time through the loop,
	// it'll be the lastButtonState:
	lastButtonState = reading;
}


boolean settingPumps = false;
String command;

void serial(){
	if (Serial.available() > 0)
	{

		if (!settingPumps)
		{
			command = Serial.readStringUntil('\n');
			Serial.println(command);

			if (command.startsWith("SET"))
			{
				settingPumps = true;
			}
			else if (command.startsWith("RUN"))
			{
				requestRun = true;
			}
		}
		else
		{
			//setting pumps
			command = Serial.readStringUntil('\n');
			Serial.println("~" + command);
			Pump *pump;
			String pumpName = "PUMP1";
			if (command.startsWith("PUMP1 "))
			{
				pumpName = "PUMP1";
				pump = &pump1;
			}
			else if (command.startsWith("PUMP2 "))
			{
				pumpName = "PUMP2";
				pump = &pump2;
			}
			else if (command == ""){
				settingPumps = false;//finished pump reading
			}
			if (settingPumps){
				Serial.print("SETTING ");
				Serial.print(pumpName);

				command = command.substring(6);

				int millis = command.toInt();
				pump->setPourTime(millis);

				Serial.print(" to run for ");
				Serial.print(millis);
				Serial.println("ms");

			}
		}

		canRun = !settingPumps;
	}
}

