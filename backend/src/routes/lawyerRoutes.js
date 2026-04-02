const express = require('express');
const router = express.Router();

// GET nearby lawyers using Geoapify
router.get('/nearby', async (req, res) => {
    const { lat, lng } = req.query;
    const apiKey = process.env.GEOAPIFY_API_KEY;

    if (!lat || !lng) {
        return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    try {
        // Categories 'service.legal' finds lawyers, notaries, and law firms
        const url = `https://api.geoapify.com/v2/places?categories=service.legal&filter=circle:${lng},${lat},5000&bias=proximity:${lng},${lat}&limit=20&apiKey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Geoapify API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Clean the data so your React frontend gets exactly what it needs
        const lawyers = data.features.map(f => ({
            name: f.properties.name || "Law Office / Advocate",
            address: f.properties.address_line2,
            city: f.properties.city,
            distance: Math.round(f.properties.distance), // Distance in meters
            lat: f.properties.lat,
            lon: f.properties.lon
        }));

        res.status(200).json(lawyers);
    } catch (error) {
        console.error("Geoapify Error:", error.message);
        res.status(500).json({ message: "Failed to find nearby lawyers" });
    }
});

module.exports = router;
