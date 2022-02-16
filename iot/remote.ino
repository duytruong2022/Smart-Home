#include <IRremote.h> // thư viện hỗ trợ IR remote

const int receiverPin = 8; // chân digital 8 dùng để đọc tín hiệu
IRrecv irrecv(receiverPin); // tạo đối tượng IRrecv mới
decode_results results;// lưu giữ kết quả giải mã tín hiệu
void setup()
{
  Serial.begin(9600);// serial baudrate 9600
  irrecv.enableIRIn(); // start the IR receiver
}
void loop()
{
  if (irrecv.decode(&results)) // nếu nhận được tín hiệu
  {
    client.publish(results.value, "remote"); // gửi lên mqtt
    delay(200);
    irrecv.resume(); // nhận giá trị tiếp theo
  }
}
