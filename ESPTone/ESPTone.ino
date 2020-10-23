#include <ctype.h>
#include <WiFi.h>

const int NUM_REMOVE_FROM_LINE = 8;
const int pins[] = {13, 12, 27, 33, 15, 32, 14, 22, 23};
const char* ssid = "MyAltice ff1637";
const char* password = "82-orchid-5366";

WiFiServer server(80);

// Set your Static IP address
IPAddress local_IP(192, 168, 1, 184);

// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < sizeof(pins); i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], LOW);
  }

  delay(10);

  // We start by connecting to a WiFi network

  // Configures static IP address
  if (!WiFi.config(local_IP, gateway, subnet)) {
    Serial.println("STA Failed to configure");
  }

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  server.begin();
}

int value = 0;

void loop() {
  WiFiClient client = server.available();   // listen for incoming clients
  
  if (client) {                             // if you get a client,
    Serial.println("New Client.");           // print a message out the serial port
    String currentLine = "";                // make a String to hold incoming data from the client
    while (client.connected()) {            // loop while the client's connected
      if (client.available()) {             // if there's bytes to read from the client,
        char c = client.read();             // read a byte, then
        Serial.write(c);                    // print it out the serial monitor
        if (c == '\n') {                    // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // and a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();
            
            // break out of the while loop:
            break;
          } else {    // if you got a newline, then clear currentLine:
            printStates(currentLine);
            currentLine = "";
          }
        } else if (c != '\r') {  // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
        }
      }
    }
      
    // close the connection:
    client.stop();
    Serial.println("Client Disconnected.");
  }
}

void printStates(String currentLine) {
  if (!currentLine.startsWith("GET") && !currentLine.startsWith("POST")) {
    return;
  }

  int pinIndex = 0;
  String inputStr = currentLine.substring(0, currentLine.length() - NUM_REMOVE_FROM_LINE);
  for (int i = 0; i < inputStr.length(); i++) {
    if (isDigit(inputStr.charAt(i))) {
      int digitalValue = inputStr[i] - '0';
      Serial.println(digitalValue);
      if (pinIndex < sizeof(pins)) {
        Serial.println(pins[pinIndex]);
        digitalWrite(pins[pinIndex], digitalValue);
      }
      pinIndex++;
    }
  }
}
