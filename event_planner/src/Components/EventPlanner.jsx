import React from 'react';
import './EventPlanner.css';
import Footer from "./Footer.jsx"; // Import CSS file for styling

const EventPlanner = () => {
    return (
        <>
        <div className="event-planner-container">
            <header>
                <h1>Welcome to Event Planner</h1>
            </header>
            <section className="description">
                <p>
                    Plan and organize your events effortlessly with Event Planner. From
                    birthdays to corporate meetings, we&apos;ve got you covered.
                </p>
                <button className="get-started-button">Get Started</button>
            </section>
            <section className="events_categories">
                <section className="events_categories">
                    {/* Social event types */}
                    <ul>
                        <h2>Social Events:</h2>
                        <li>Birthday parties</li>
                        <li>Anniversary celebrations</li>
                        <li>Wedding receptions</li>
                        <li>Baby showers</li>
                        <li>Graduation parties</li>
                        <li>Family reunions</li>
                    </ul>
                    {/* Entertainment-based event types */}
                    <ul>
                        <h2>Entertainment Events:</h2>
                        <li>Concerts</li>
                        <li>Music festivals</li>
                        <li>Film screenings</li>
                        <li>Comedy shows</li>
                        <li>Art exhibitions</li>
                        <li>Cultural events</li>
                    </ul>
                    {/* Community-focused event types */}
                    <ul>
                        <h2>Community Events:</h2>
                        <li>Fundraising events</li>
                        <li>Charity galas</li>
                        <li>Volunteer drives</li>
                        <li>Neighborhood block parties</li>
                        <li>Community festivals</li>
                        <li>Cultural celebrations</li>
                    </ul>
                </section>
            </section>
            <section className="features">
            <h2>Features</h2>
                <ul>
                    <li>Easy event creation and management</li>
                    <li>Customizable event templates</li>
                    <li>Guest list management</li>
                    <li>Real-time collaboration</li>
                    <li>Reminders and notifications</li>
                </ul>
            </section>
            <section className="testimonials">
                <h2>Testimonials</h2>
                <div className="testimonial">
                    <p>&quot;Event Planner made organising my wedding a breeze. Highly recommended!&quot;</p>
                    <p className="author">- Emily Johnson</p>
                </div>
                <div className="testimonial">
                    <p>&quot;I use Event Planner for all my corporate events. It saves me so much time and effort!&quot;</p>
                    <p className="author">- John Smith</p>
                </div>
            </section>
            <section className="contact">
                <h2>Contact Us</h2>
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <textarea placeholder="Message"></textarea>
                    <button className="submit-button">Send</button>
                </form>
            </section>
            <Footer />
        </div>
        </>
    );
};

export default EventPlanner;
