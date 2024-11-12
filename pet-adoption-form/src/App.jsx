import { useState } from 'react'

function App() {
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);

  function invertShowTable() {
    setShowTable(!showTable);
  }
  
  function updateUserData(newEntry) {
    setData(prevData => {
      return [...prevData, newEntry];
    })
  }

  return <>
    <Header></Header>
    {!showTable && <Form onSubmit={invertShowTable} updateUserData={updateUserData} ></Form>}
    {showTable && <UserTable onClick={invertShowTable} data={data}></UserTable>}
  </>
}

function Header() {
  return <div style={headerStyle}>
    Pet Adoption Form
  </div>
}

function validateInput(id, value) {
  let error = "";
  if(id == "Pet Name") {
    if(value.length < 4) {
      error = "Pet Name should have more than 3 characters!"
    }
  }else if(id == "Pet Type") {
    if(value.length == 0) {
      error = "Pet Type can't be empty!"
    }
  }else if(id == "Breed") {
    if(value.length < 4) {
      error = "Breed value should have more than 3 characters!"
    }
  }else if(id == "Your Name") {
    if(value.length < 4) {
      error = "Your Name should have more than 3 characters!"
    }
  }else if(id == "Email") {

  }else if(id == "Phone") {
    if(isNaN(Number(value))) {
      error = "Phone number should only contain digits from 0 - 9!"
    }else if(value.length != 10) {
      error = "Phone number should have exactly 10 digits!"
    }
  }
  return error;
}

const inputFields = ["Pet Name", "Pet Type", "Breed", "Your Name", "Email", "Phone"];
function Form({onSubmit, updateUserData}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const {id, value} = e.target;
    const errorFound = validateInput(id, value);
    setErrors(prevErrors => {
      return {...prevErrors, [id]: errorFound};
    })
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    for(const id of inputFields) {
      if(!(id in formData)) {
        const errorFound = validateInput(id, "");
        newErrors[id] = errorFound;
      }
    }
    setErrors(prevErrors => {
      return {...prevErrors, ...newErrors};
    })

    let canUpdate = true;
    Object.values(errors).forEach((value) => {
      if(value !== "") {
        canUpdate = false;
      }
    }) 
    if(JSON.stringify(newErrors) !== "{}") {
      canUpdate = false;
    }
    
    if(canUpdate) {
      updateUserData(formData);
      onSubmit();
    }
  };

  return <form onSubmit={handleSubmit} style={formStyle}>
      {
      inputFields.map(field => (
        <div key={field} style={fieldDivStyle}>
          <label htmlFor={field} style={labelStyle}>{field}</label>
          <input type="text" placeholder={field} id={field} style={inputStyle} value={formData[field] || ""} onChange={handleChange}></input>
          <p>{errors[field] || ""}</p>
        </div>

      ))
    }
    <button type="submit" style={buttonStyle}>Submit</button>
    </form>
}

function UserTable({onClick, data}) {
  return <div style={formStyle}>
    {
      data.map(d => (
        <div style={rowStyle}>
          <div style={cellStyle}>{d["Pet Name"]}</div>
          <div style={cellStyle}>{d["Pet Type"]}</div>
          <div style={cellStyle}>{d["Breed"]}</div>
          <div style={cellStyle}>{d["Your Name"]}</div>
          <div style={cellStyle}>{d["Email"]}</div>
          <div style={cellStyle}>{d["Phone"]}</div>
        </div>

      ))
    }
    <button onClick={onClick} style={buttonStyle}>Go Back</button>
  </div>
}

const headerStyle = {
  textAlign: "center", color: "green", 
  backgroundColor: "goldenrod",
  borderRadius: 10, margin: "10px 18% 0px 18%",
  padding: "10px 0px 10px 50px",
  fontSize: '18px',          
  fontWeight: 'bold', 
}

const formStyle = {
  backgroundColor: "goldenrod",
  margin: "3% 12% 0% 12%",
  borderRadius: "10px",
  border: '1px solid #ccc', 
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
  margin: "2% 0% 2% 47%",
  height: 30,
  width: 100,
  color: "green",
  backgroundColor: "lightgray",
  borderRadius: "5px",
  borderStyle: "none"
}

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  margin: "3px 3px 0px 3px"
}
const cellStyle = {
  textAlign: "center",
  border: "1px solid #ccc"
}

export default App
