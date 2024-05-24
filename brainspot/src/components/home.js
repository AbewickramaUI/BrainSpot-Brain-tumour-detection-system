import React from 'react'

import { FaCheck } from 'react-icons/fa';

import myImage from './Images/brain.png';
import './home.css';


function home() {
    return (
      <div className="home-container">
        <img src={myImage} alt="img" />
  
        <div className="section1">
       
          <h2>BrainSpot</h2>
          <br/>
          <div className="section2">
          <p><FaCheck style={{ marginRight: '10px' }} /> Accuracy </p>
            <p><FaCheck style={{ marginRight: '10px' }} /> Open source </p>
            <p><FaCheck style={{ marginRight: '10px' }} /> Tumour classification </p>
            <p><FaCheck style={{ marginRight: '10px' }} /> Diagnosis report analysing</p>
            <p><FaCheck style={{ marginRight: '10px' }} /> Automated reporting </p>
            
            
          </div>
          <button className='demo'>REQUEST A DEMO NOW</button>
        </div>
       
      </div>
    );
  }

export default home