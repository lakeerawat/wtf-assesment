// LoginPage.js
import React, { useEffect, useState } from 'react';
import '../style/login.css';
import { toast } from 'react-toastify';

const LoginPage = ({id,classname,handleClose}) => {
    const[singleData,setSingleData] = useState()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
  });
  const fetchSingleAPI = (id)=>{
    return fetch(`http://localhost:8000/classes/${id}`).then(res=>res.json()).then(res=> setSingleData(res))
}
useEffect(()=>{
    fetchSingleAPI(id)
},[id])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function postJSON(data) {
    try {
      const response = await fetch(`http://localhost:8000/classes/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
    //   const result = await response.json();
      toast.success("user suceesfully enrolled")
      handleClose()
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // const arr = [...singleData?.users,formData]
    const flag = singleData?.users.filter(el=>el.email === formData.email)
    if(flag.length > 0){
    toast.error("user already enrolled with this email")
    }
    else if(flag.length === 0){
    const dataOb={...singleData,users:[...singleData?.users,formData]}
    postJSON(dataOb)
    // git@github.com:lakeerawat/wtf-assesment.git
    // You can add your logic for handling form submission here
}
  };

  return (
    <div className="login-container">
      <h2>Enroll for {classname}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
