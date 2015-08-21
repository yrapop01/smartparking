// the setup routine runs once when you press reset:

void setup() {                
    // initialize the digital pin as an output.
    for (int i=5; i<12; i++)
        pinMode(i, OUTPUT);
    
    Serial.begin(9600);
}

void lightNum(int num)
{
  
  digitalWrite(5, LOW);
  digitalWrite(6, LOW);
  digitalWrite(7, LOW);
  digitalWrite(8, LOW);
  digitalWrite(9, LOW);
  digitalWrite(10, LOW);
  digitalWrite(11, LOW);
  
  
  switch (num)
    {
      case 0:
        digitalWrite(5, HIGH);
        digitalWrite(7, HIGH);
        digitalWrite(8, HIGH);
        digitalWrite(9, HIGH);
        digitalWrite(10, HIGH);
        digitalWrite(11, HIGH);
        break;
       
       case 1:
        digitalWrite(9, HIGH);
        digitalWrite(10, HIGH);
        break;
        
       case 2:
        digitalWrite(6, HIGH);
        digitalWrite(7, HIGH);
        digitalWrite(8, HIGH);
        digitalWrite(9, HIGH);
        digitalWrite(11, HIGH);
        break;
       
       case 3:
        digitalWrite(6, HIGH);
        digitalWrite(8, HIGH);
        digitalWrite(9, HIGH);
        digitalWrite(10, HIGH);
        digitalWrite(11, HIGH);
        break;
        
       case 4:
        digitalWrite(5, HIGH);
        digitalWrite(6, HIGH);
        digitalWrite(9, HIGH);
        digitalWrite(10, HIGH);
        break;
       
       case 5:
        digitalWrite(5, HIGH);
        digitalWrite(6, HIGH);
        digitalWrite(8, HIGH);
        digitalWrite(10, HIGH);
        digitalWrite(11, HIGH);
        break;
        
       case 6:
        digitalWrite(5, HIGH);
        digitalWrite(6, HIGH);
        digitalWrite(7, HIGH);
        digitalWrite(8, HIGH);
        digitalWrite(10, HIGH);
        digitalWrite(11, HIGH);
        break;
        
       case 7:
        digitalWrite(8, HIGH);
        digitalWrite(9, HIGH);
        digitalWrite(10, HIGH);
        break;
        
       case 8:
        digitalWrite(5, HIGH);
        digitalWrite(6, HIGH);
        digitalWrite(7, HIGH);
        digitalWrite(8, HIGH);
        digitalWrite(9, HIGH);
        digitalWrite(10, HIGH);
        digitalWrite(11, HIGH);
        break;
    }
}

// the loop routine runs over and over again forever:
void loop() {
    if (!Serial.available())
        return;
    
    int i = Serial.read() - '0';
    
    lightNum(i);
    delay(50);
}

