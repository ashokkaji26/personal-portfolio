const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration (browser-safe)
const corsOptions = {
    origin: "https://ashokkaji-portfolio.netlify.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Explicit preflight handling
app.options("*", cors(corsOptions));

// Health check
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Contact API
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    console.log("New Contact Message:", { name, email, message });

    return res.status(200).json({
        success: true,
        message: "Message received successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});