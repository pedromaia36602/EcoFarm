// Arduino - Sensor de umidade do solo e Sensor de chuva


int sensorUmidadeSolo = A0;             
int portaRele = 4;                      
int valorLimiteUmidade = 600;         
bool soloUmido;                         
int valorSensorUmidadeSolo = 0;         

void setup()
{
  pinMode(sensorUmidadeSolo, INPUT);     
  pinMode(portaRele, OUTPUT);            
  digitalWrite(portaRele, HIGH);         
  Serial.begin(9600);                    
}

void SensorDeUmidade ()
{

  valorSensorUmidadeSolo = analogRead(sensorUmidadeSolo);   
  Serial.print(valorSensorUmidadeSolo);

  if (valorSensorUmidadeSolo < valorLimiteUmidade) /
  {
    Serial.println("  => O solo esta úmido");
    soloUmido = 1;  
  }
  else
  {
    Serial.println("  => O solo esta seco");
    soloUmido = 0;  
  }
}

void ControleDoRele()  
{
  digitalWrite(portaRele, LOW);   
  Serial.println(" Relé acionado ");
  delay (1000);                  
  digitalWrite(portaRele, HIGH);  
}

void loop()
{
  for (int i = 1; i < 4321; i++)
  {
    SensorDeUmidade ();


    Serial.print("Umidade:");
    Serial.print(valorSensorUmidadeSolo);
    Serial.print(";Bomba:");
    Serial.println(soloUmido == 0 ? 1 : 0);

    if (soloUmido == 0) ControleDoRele();  

    Serial.print(i * 10);
    Serial.println(" segundos");
    Serial.println();

    delay(10000); // 10 segundos de espera
  }
}
