// Arduino - Sensor de umidade do solo e Sensor de chuva
// Corrigido: valorSensorUmidadeSolo agora é global

int sensorUmidadeSolo = A0;             // Sensor de umidade do solo pino A0
int portaRele = 4;                      // porta de controle do relé conectada no D4
int valorLimiteUmidade = 600;           // valor de comparação (0-1023)
bool soloUmido;                         // condição de solo úmido 
int valorSensorUmidadeSolo = 0;         // <-- variável global (corrigido)

void setup()
{
  pinMode(sensorUmidadeSolo, INPUT);     // A0 entrada
  pinMode(portaRele, OUTPUT);            // D4 saída
  digitalWrite(portaRele, HIGH);         // Mantenha relé desligado 
  Serial.begin(9600);                    // Monitor serial 9600 Bps
}

void SensorDeUmidade ()
{
  // atribui ao global (não declarar int aqui)
  valorSensorUmidadeSolo = analogRead(sensorUmidadeSolo);    // leitura do sensor
  Serial.print(valorSensorUmidadeSolo);

  if (valorSensorUmidadeSolo < valorLimiteUmidade) // menor = mais úmido (dependendo do sensor)
  {
    Serial.println("  => O solo esta úmido");
    soloUmido = 1;  // solo úmido
  }
  else
  {
    Serial.println("  => O solo esta seco");
    soloUmido = 0;  // solo seco
  }
}

void ControleDoRele()  // aciona a bomba (ajuste tempo se quiser)
{
  digitalWrite(portaRele, LOW);   // relé ligado (assumindo relé ativo LOW)
  Serial.println(" Relé acionado ");
  delay (1000);                   // tempo de acionamento da bomba = 1 segundo
  digitalWrite(portaRele, HIGH);  // relé desligado
}

void loop()
{
  for (int i = 1; i < 4321; i++)
  {
    SensorDeUmidade ();

    // imprime no formato que o Python espera: "Umidade:530;Bomba:1"
    // Bomba: 1 -> quando a bomba foi acionada (no seu código bomba aciona quando soloUmido == 0)
    Serial.print("Umidade:");
    Serial.print(valorSensorUmidadeSolo);
    Serial.print(";Bomba:");
    Serial.println(soloUmido == 0 ? 1 : 0);

    if (soloUmido == 0) ControleDoRele();  // aciona a bomba se solo seco

    Serial.print(i * 10);
    Serial.println(" segundos");
    Serial.println();

    delay(10000); // 10 segundos de espera
  }
}
