import { useState } from 'react'
function App() {
  return <>
    <Header></Header>
    <Form></Form>
  </>
}
function Header() {
  return <div style={headerStyle}>
    Pet Adoption Form
  </div>
}

const inputFields = ["Pet Name", "Pet Type", "Breed", "Your Name", "Email", "Phone"];
function Form() {
  return <form style={formStyle}>
      {
      inputFields.map(field => (
        <div key={field} style={fieldDivStyle}>
          <label for={field} style={labelStyle}>{field}</label>
          <input type="text" placeholder={field} id={field} style={inputStyle}></input>
        </div>

      ))
    }
    <button type="submit" style={buttonStyle}>Submit</button>
    </form>
}

const headerStyle = {
  textAlign: "center", color: "green", 
  backgroundColor: "goldenrod",
  borderRadius: 10, margin: 20,
  padding: "10px 0px 10px 50px",
  fontSize: '18px',          
  fontWeight: 'bold', 
}

const formStyle = {
  backgroundColor: "goldenrod",
  margin: "3% 12% 0% 12%",
  borderRadius: "10px",
  border: '1px solid #ccc', // Optional: add a border to see the form boundaries
}
const fieldDivStyle = {
  margin: "2% 0% 0% 7%",
}

const labelStyle = {
  display: "block",
  color: "green",
  fontSize: '18px',          
  fontWeight: 'bold',   
  marginBottom: '5px'
}

const inputStyle = {
  padding: "7.5px 0px 7.5px 5px",
  width: "70%",
  borderRadius: 10,
  borderStyle: "none",
  border: "1px solid #ccc"
}
const buttonStyle = {
  margin: "2% 0% 2% 40%",
  height: 30,
  width: 100,
  color: "green",
  backgroundColor: "lightgray",
  borderRadius: "5px",
  borderStyle: "none"
}

export default App
