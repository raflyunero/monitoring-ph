import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

function App() {
  const [phValue, setPhValue] = useState(null);
  const [moistureValue, setMoistureValue] = useState(null);
  const [data, setData] = useState([]);
  const ESP32_URL = "http://192.168.1.27/sensor"; // Ganti dengan IP ESP32 yang sesuai

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(ESP32_URL, {
          method: "GET",
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const sensorData = await response.json();
        console.log("Data sensor diterima:", sensorData);

        if (sensorData.ph !== undefined && sensorData.moisture !== undefined) {
          setPhValue(sensorData.ph);
          setMoistureValue(sensorData.moisture);

          const newData = {
            time: new Date().toLocaleTimeString(),
            ph: sensorData.ph,
            moisture: sensorData.moisture,
          };

          setData((prevData) => [...prevData.slice(-9), newData]);
        } else {
          console.error("Data sensor tidak lengkap:", sensorData);
        }
      } catch (error) {
        console.error("Gagal mengambil data sensor:", error);
      }
    };

    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src="/Logoo.png" alt="TaniHarjo Logo" className="logo" />
          <h1 className="brand">TaniHarjo</h1>
        </div>
      </header>

      {/* Konten utama */}
      <main className="content">
        <h2>Monitoring Tanah</h2>
        <p className="additional-text">KEBUN GIZI</p>

        {/* Tampilan pH dan Kelembaban */}
        <div className="sensor-container">
  <div className="sensor-text">
    Angka pH: {phValue !== null ? phValue.toFixed(2) : "Menunggu data..."}
  </div>
</div>

        {/* Grafik Monitoring pH */}
        <div className="chart-container">
          <h3>Grafik Perubahan pH Tanah:</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis domain={[0, 14]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ph" stroke="#3C3964FF" strokeWidth={2} dot={{ r: 5 }} />            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p className="footer-text">
          WEB INI DIRANCANG DAN DIDESAIN OLEH KKN TIM 1 UNDIP 2024/2025
        </p>
      </footer>
    </div>
  );
}

export default App;
