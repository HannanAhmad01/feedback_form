import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
        rating: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.trim()) errors.email = 'Email is required';
        if (!formData.feedback.trim()) errors.feedback = 'Feedback is required';
        if (!formData.rating) errors.rating = 'Rating is required';
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const confirmationMessage = `
              Name: ${formData.name}
              Email: ${formData.email}
              Feedback: ${formData.feedback}
              Rating: ${formData.rating}
            `;
            const isConfirmed = window.confirm(`Please confirm your details:\n\n${confirmationMessage}`);
            if (isConfirmed) {
                console.log('Submitting feedback:', formData);
                setFormData({
                    name: '',
                    email: '',
                    feedback: '',
                    rating: ''
                });
                alert('Thank you for your valuable feedback!');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <nav>
                Tell Us What You Think
            </nav>
            <form onSubmit={handleSubmit} className="feedback-form">
                <h2>We'd Love to Hear From You!</h2>
                <p>Please share your feedback with us.</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
                
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                
                <textarea
                    name="feedback"
                    placeholder="Your Feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                ></textarea>
                {errors.feedback && <span className="error">{errors.feedback}</span>}
                
                <div>
                    <label>Rating:</label>
                    <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    >
                        <option value="">Select a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.rating && <span className="error">{errors.rating}</span>}
                </div>
                
                <button type="submit">Submit Feedback</button>
            </form>
        </>
    );
};

export default FeedbackForm;
