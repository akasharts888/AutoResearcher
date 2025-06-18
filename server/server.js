const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const ResearchMemory = require('./models/researchModel')
const axios = require("axios");
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,          
  }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/research_agentic_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error", err));

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";
app.use('/api/auth', authRoutes);

app.post("/api/research", authMiddleware,async (req, res) => {
    console.log("topic name is : ",req.body.topic);
    const userId = req.user.id;
    const userName = req.user.username;
    try {
        const response = await axios.post(`${PYTHON_BACKEND_URL}/run-research`, {
            topic: req.body.topic,
            user_id:userId,
            user_name:userName
        });

        console.log("response from python : ",response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/research-sessions",authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
      const sessions = await ResearchMemory.find({'user_id':userId}, 'query -_id');
    //   console.log("sessions : ",sessions);
      res.status(200).json({ sessions });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Failed to fetch queries" });
    }
});

app.get("/api/research-session/:query",authMiddleware,async(req,res) => {
    const userId = req.user.id;
    const { query } = req.params;
    console.log("query is ::",query);
    try{
        const session = await ResearchMemory.find({ query: { $regex: query, $options: "i" } });
        console.log("got result :: ",session);
        res.status(200).json({ session });

    }catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to fetch details" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js server listening on http://localhost:${PORT}`);
});
