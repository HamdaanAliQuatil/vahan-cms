import React, { useState } from 'react';
import '../styles/record-box.css';
import { generateHash } from '../utils/hash.utils';

interface RecordFormProps {
  selectedTab: string;
}

const RecordForm: React.FC<RecordFormProps> = ({ selectedTab }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const requestBody = JSON.stringify({
      name,
      email,
      mobileNumber,
      dateOfBirth,
    });

    // Generate hash
    const hash = generateHash(requestBody);

    if (selectedTab === 'Create Record') {
      try {
        // Call API to create table
        await fetch('http://localhost:3000/v1/', {
          method: 'POST',
        });

        // Call API to create entity
        await fetch('http://localhost:3000/v1/entity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Hash': hash,
          },
          body: requestBody,
        });

        // if successful, show success message
        alert('Record created successfully!');

        // Reset form fields
        setName('');
        setEmail('');
        setMobileNumber('');
        setDateOfBirth('');
      } catch (error) {
        console.error('Error creating record:', error);
      }
    } 
  };

  return (
    <div className="record-form-container">
      <div className="tab">{selectedTab}</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button" style={{ 
          padding: "10px 20px", 
          borderRadius: "5px",
          position: "relative",
          left: "30%",
        }}>Continue</button>
      </form>
    </div>
  );
};

export default RecordForm;
