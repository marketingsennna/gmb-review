const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "API KEY;

app.post("/generate", async (req, res) => {

  const { services, location, rating } = req.body;

  const prompt = `Write a ${rating}-star Google review.
Services: ${services.join(", ")}
Location: ${location}
Make it human and natural.`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API Key
        }
      }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No review";

    res.json({ review: text });

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ error: "API error" });
  }

});

app.get("/", (req,res)=>res.send("Backend Running"));

app.listen(process.env.PORT || 3000);
