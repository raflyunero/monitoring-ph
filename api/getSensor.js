export default async function handler(req, res) {
    try {
        const response = await fetch("http://192.168.1.27/sensor");
        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data" });
    }
}
