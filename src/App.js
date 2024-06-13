import React, { useEffect } from "react";
import axios from "axios";
import Contact from "./contact.js";

function App() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "/macros/s/AKfycbw2Qy5Qc0kKJGGVpKFO87RFR8xJT353BNU27yFwyylAfFeWJPsVWiHapAweAz_MQH3xyA/exec"
        );
        console.log("Data received:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Contact />
    </div>
  );
}

export default App;
