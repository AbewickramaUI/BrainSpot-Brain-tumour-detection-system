import React from 'react';
import './service.css';

function Service() {
  const services = [
    {
      name: 'All-in-one environment',
      description: 'Multi-modality platform that can serve the demanding needs of modern multidisciplinary healthcare teams',
      image: 'service1.jpg',
    },
    {
      name: 'Automated Processing',
      description: 'Automate the analysis of your MRI scans using machine learning technologies',
      image: 'service2.jpg',
    },
    {
      name: 'Accessibility',
      description: 'Work from any location by just using a browser and internet connection.',
      image: 'service3.jpg',
    },
    {
      name: 'Automated Reporting',
      description: 'Benefit from a standardized report, including all critical findings derived from your analysis',
      image: 'service4.jpg',
    },
    {
      name: 'Security',
      description: 'Your medical data are securely transmitted and stored. Robust encryption protocols are applied in order to secure and protect any sensitive personal healthcare information',
      image: 'service5.jpg',
    },
  ];

  return (
    <div className="service-container">
      <h2>Our Services</h2>
      <div className="service-list">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            {/* <img src={service.image} alt={service.name} /> */}
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;


