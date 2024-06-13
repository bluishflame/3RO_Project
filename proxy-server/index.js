const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 프록시 엔드포인트 설정
app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbx0797DLUat9n2Z7b0m-XYH8m5LAnE4ucD7bvz53AVZTFJiq6iRUFvDxywcAoWfIvJGZw/exec",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 클라이언트 정적 파일 제공
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
