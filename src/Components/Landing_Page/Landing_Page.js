import React from 'react';
import './LandingPage.css';

const Landing_Page = () => {
  return (
    <div>
      <section className="hero-section">
        <div>
          <div data-aos="fade-up" className="flex-hero">

            <h1>
              Your Health<br />
              <span className="text-gradient">
                Our Responsibility
              </span>
            </h1>

            <div className="blob-cont">
              <div className="blue blob"></div>
            </div>
            <div className="blob-cont">
              <div className="blue1 blob"></div>
            </div>

            <h4>
              At StayHealthy, your health is our highest priority. We believe medical care should be accessible, compassionate, and tailored to every individual. From routine checkups to expert advice, our team is here to support your journey to lifelong wellness.
            </h4>
            <a href="#services">
              <button className="button">Get Started</button>
            </a>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing_Page;
