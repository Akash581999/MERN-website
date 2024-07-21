// App.js
import './App.css';
import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/contactform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Request-Mode': 'no-cors'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message);

      // Reset form data after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        state: '',
        zip: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <div className="container">
      <h1>Contact Form</h1>
      <form className="row g-3" onSubmit={handleSubmit} autoComplete='true'>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">First name</label>
          <input type="text" className="form-control" id="validationCustom01" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">Last name</label>
          <input type="text" className="form-control" id="validationCustom02" name="lastName" value={formData.lastName} onChange={handleChange} required />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">Username</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">@</span>
            <input type="text" className="form-control" id="validationCustomUsername" name="username" value={formData.username} onChange={handleChange} aria-describedby="inputGroupPrepend" required />
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">City</label>
          <input type="text" className="form-control" id="validationCustom03" name="city" value={formData.city} onChange={handleChange} required />
          <div className="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">State</label>
          <select className="form-select" id="validationCustom04" name="state" value={formData.state} onChange={handleChange} required>
            <option disabled value="">Choose...</option>
            <option>Meerut</option>
            <option>Noida</option>
            <option>Gurgaon</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid state.
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom05" className="form-label">Zip</label>
          <input type="text" className="form-control" id="validationCustom05" name="zip" value={formData.zip} onChange={handleChange} required />
          <div className="invalid-feedback">
            Please provide a valid zip.
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="invalidCheck" name="agreeTerms" />
            <label className="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
