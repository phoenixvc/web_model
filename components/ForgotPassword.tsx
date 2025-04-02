import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('/api/auth/forgot-password', formData);
        setSuccess(true);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ submit: error.response.data.message });
        } else {
          setErrors({ submit: 'Password reset request failed. Please try again.' });
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Forgot Password</h1>
        {success ? (
          <p>Password reset instructions have been sent to your email.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <button type="submit">Submit</button>
            {errors.submit && <p>{errors.submit}</p>}
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
