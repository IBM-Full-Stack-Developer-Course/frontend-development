// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './FeedbackForm.css'; // Import CSS for styling

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
        rating: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        /* Original from lab
        const confirmationMessage = `
            Name: ${formData.name}
            Email: ${formData.email}
            Feedback: ${formData.feedback}
        `;
        */

        // Better, cleaner version
        const confirmationMessage = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Feedback: ${formData.feedback}`,
            `Rating: ${formData.rating}`,
        ].join('\n');

        const isConfirmed = window.confirm(`Please confirm your details:\n\n${confirmationMessage}`);

        if (isConfirmed) {
            console.log('Submitting feedback:', formData);
            setFormData({
                name: '',
                email: '',
                feedback: '',
                rating: ''
            })
            alert('Feedback submitted successfully. Thanks...\n(Like we care about your opinion).');
        }
    };

    return (
        <>
            <nav>
                Tell Us What You Think
            </nav>
            <form className="feedback-form" onSubmit={handleSubmit}>
                <h2>We&apos;d Love to Hear From You!</h2>
                <p>Please share your feedback with us.</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}/>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}/>
                <textarea
                    name="feedback"
                    placeholder="Your Feedback"
                    value={formData.feedback}
                    onChange={handleChange}>
                </textarea>
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Your rating</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'row', marginBottom: '20px' }}>
                    <input
                        type="radio"
                        name="rating"
                        value="1"
                        checked={formData.rating === '1'}
                        onChange={handleChange}/>
                    <label htmlFor="rating-1">1</label>
                    <input
                        type="radio"
                        name="rating"
                        value="2"
                        checked={formData.rating === '2'}
                        onChange={handleChange}/>
                    <label htmlFor="rating-2">2</label>
                    <input
                        type="radio"
                        name="rating"
                        value="3"
                        checked={formData.rating === '3'}
                        onChange={handleChange}/>
                    <label htmlFor="rating-3">3</label>
                    <input
                        type="radio"
                        name="rating"
                        value="4"
                        checked={formData.rating === '4'}
                        onChange={handleChange}/>
                    <label htmlFor="rating-4">4</label>
                    <input
                        type="radio"
                        name="rating"
                        value="5"
                        checked={formData.rating === '5'}
                        onChange={handleChange}/>
                    <label htmlFor="rating-5">5</label>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </>
    );
};



export default FeedbackForm;
