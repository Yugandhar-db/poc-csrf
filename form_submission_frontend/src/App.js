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
    // const formDataObject = new FormData();

    // Append form data to the FormData object
    // formDataObject.append("name", e.target.name.value);
    // formDataObject.append("email", e.target.email.value);
    // formDataObject.append(
    //   "csrfmiddlewaretoken",
    //   e.target.csrfmiddlewaretoken.value || "na"
    // );
    const url = "http://localhost:8000/";
    const csrfToken = getCookie("csrftoken");
    const body = {
      name: "Yugandhar",
      email: "yugandhar.madem@databeat.io",
      "csrfmiddlewaretoken":csrfToken

    };
    
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cookie": "csrftoken".concat("=", csrfToken),
      "X-CSRFToken": csrfToken,
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.mode = 'same-origin'
    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrfToken);
    // xhr.setRequestHeader("Cookie", "csrftoken".concat("=", csrfToken));

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request successful, handle the response data
          console.log("Response:", xhr.responseText);
        } else {
          // Request failed, handle the error
          console.error("Error:", xhr.status, xhr.statusText);
        }
      }
    };

    xhr.send(JSON.stringify(body));

    // try {
    //   const response = await axios.post(url, body, {
    //     headers: headers,
    //   });
    // } catch (error) {
    //   console.error("Error:===>", error);
    // }
    // fetch("http://localhost:8000/", {
    //   method: "POST",
    //   withCredentials: true,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Cookie: "csrftoken".concat("=", getCookie("csrftoken")),
    //   },
    //   body: formDataObject,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response data
    //     console.log("Response:", data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error("Error:==>", error);
    //   });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get-csrf", {
        // credentials: "include",
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Function to fetch data from the API
    fetchData();
  });

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
