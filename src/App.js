import { useState, useEffect } from "react";
// import SelectComponent from "./SelectComponent";
import "./style.css";


export default function App() {
  const [data, setData] = useState(null);
  const [getState, setState] = useState([]);
  const [getOcc, setOcc] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    occupation: "",
    state: ""
  });

  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setState(
          jsonData.states.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))
        );
        setOcc(
          jsonData.occupations.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(event.target.email.value);
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let occupation = event.target.occupation.value;
    let state = event.target.state.value;
    fetch("https://frontend-take-home.fetchrewards.com/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        occupation,
        state
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if ("id" in data) {
          alert("Success");
        } else {
          alert("Something went Wrong");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
       <div class="imgcontainer">
    <img src="https://mma.prnewswire.com/media/1309683/Fetch_Rewards_Logo.jpg?p=facebook" alt="Avatar" class="avatar"></img>
      </div>
      <div className="container">
    
      <h1>User Creation form!</h1>

      {data ? (
        <>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Occupation:
            <select
              name="occupation"
              value={formData.dropdown1}
              onChange={handleChange}
            >
              {getState}
            </select>
          </label>
          <br />
          <label>
            State:
            <select
              name="state"
              value={formData.dropdown2}
              onChange={handleChange}
            >
              {getOcc}
            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </form>
  );
}
