import React, { useState, useEffect } from "react";
import "./App.css"; // Pastikan file ini ada

function App() {
    const [phValue, setPhValue] = useState(7.0); // Nilai default pH

    useEffect(() => {
        const fetchPhData = async () => {
            try {
                const response = await fetch("http://192.168.1.100/ph"); // Ganti dengan IP ESP32
                const data = await response.json();
                setPhValue(data.ph);
            } catch (error) {
                console.error("Gagal mengambil data pH:", error);
            }
        };

        <header className="header">
    <div className="logo-container">
        <img src="/Logoo.png" alt="TaniHarjo Logo" className="logo" />
        <h1 className="brand">TaniHarjo</h1>
    </div>

    {/* Tambahkan elemen teks di kanan atas */}
    <div className="top-right-text">
        WEB INI DIRANCANG DAN DIDESAIN OLEH KKN TIM I UNDIP 2024/2025
    </div>
</header>

        const interval = setInterval(fetchPhData, 5000); // Ambil data setiap 5 detik
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
                
                {/* Tulisan pojok kanan atas */}
                <div className="top-right-text">
                    WEB INI DIRANCANG DAN DIDESAIN OLEH KKN TIM I UNDIP 2024/2025
                </div>
            </header>

            {/* Monitoring pH */}
            <main className="content">
                <h2>Monitoring pH</h2>
                <p className="additional-text">Sistem Pemantauan Tanah</p>
                <div className="circle">{phValue.toFixed(2)}</div>
                 {/* Tambahkan teks angka kelembapan tanah */}
    <p className="moisture-text">Angka kelembapan tanah :</p>
</main>
        </div>
    );
}

export default App;
