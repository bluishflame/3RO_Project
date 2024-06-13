const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
