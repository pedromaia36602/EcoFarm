import serial
from flask_cors import CORS  
import sqlite3
import time
from flask import Flask, jsonify


PORTA_SERIAL = 'COM3'  
BAUDRATE = 9600


conn = sqlite3.connect('dados_arduino.db', check_same_thread=False)
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP,
    umidade INTEGER,
    bomba_acionada INTEGER
)
''')
conn.commit()


arduino = serial.Serial(PORTA_SERIAL, BAUDRATE, timeout=1)
time.sleep(2)
print("✅ Conectado ao Arduino na porta", PORTA_SERIAL)


app = Flask(__name__)
CORS(app)  

@app.route("/dados")
def get_dados():
    cursor.execute("SELECT * FROM registros ORDER BY id DESC LIMIT 20")
    rows = cursor.fetchall()
    colunas = [desc[0] for desc in cursor.description]
    dados = [dict(zip(colunas, row)) for row in rows]
    return jsonify(dados)

def salvar_no_banco(umidade, bomba):
    cursor.execute("INSERT INTO registros (umidade, bomba_acionada) VALUES (?, ?)", (umidade, bomba))
    conn.commit()


def loop_serial():
    while True:
            linha = arduino.readline().decode('utf-8').strip()
            if linha.startswith("Umidade:") and ";Bomba:" in linha:
                try:
                    partes = linha.split(";")
                    umidade = int(partes[0].split(":")[1])
                    bomba = int(partes[1].split(":")[1])
                    salvar_no_banco(umidade, bomba)
                    print(f"💾 Salvou no banco → Umidade:{umidade} | Bomba:{bomba}")
                except Exception as e:
                    print("Erro:", e)

if __name__ == "__main__":
    from threading import Thread

    Thread(target=loop_serial, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
