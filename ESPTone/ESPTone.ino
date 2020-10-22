#ifdef ESP8266
#include <ESP8266WiFi.h>
#else
#include <WiFi.h>
#endif
#include <HTTPClient.h>

char ssid[] = "MyAltice ff1637";          // your network SSID (name)
char pass[] = "82-orchid-5366";           // your network password

HTTPClient http;
const unsigned int localPort = 8888;      // local port to listen for UDP packets (here's where we send the packets)

unsigned int ledState = LOW;              // LOW means led is *on*

#ifndef BUILTIN_LED
#ifdef LED_BUILTIN
#define BUILTIN_LED LED_BUILTIN
#else
#define BUILTIN_LED 13
#endif
#endif

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);
  digitalWrite(BUILTIN_LED, ledState);    // turn *on* led

  Serial.begin(115200);

  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Send request
  http.begin("http://arduinojson.org/example.json");
  http.GET();


  // Print the response
  Serial.print(http.getString());
  
  // Disconnect
  http.end();

  delay(2000);
}
