import "./App.css";
import CSRFToken from "./CSRFToken";
import { useEffect } from "react";
import axios from "axios";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/";
    const csrfToken = getCookie("csrftoken");
    const body = {
      name: "Yugandhar",
      email: "yugandhar.madem@databeat.io",
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ... (fetchData and other parts remain the same)

  return (
    <div className="App">
      <form onSubmit={handleSubmit} method="POST">
        <CSRFToken />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;