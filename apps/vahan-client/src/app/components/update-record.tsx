import React, { useState } from 'react';
import '../styles/record-box.css';
import { generateHash } from '../utils/hash.utils';

const UpdateRecordForm = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    email: '',
    mobile_number: '',
    date_of_birth: '',
  });
  const [updatedValues, setUpdatedValues] = useState({
    name: '',
    email: '',
    mobile_number: '',
    date_of_birth: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    Object.keys(searchCriteria).forEach(
      (key) =>
        searchCriteria[key as keyof typeof searchCriteria] === '' &&
        delete searchCriteria[key as keyof typeof searchCriteria]
    );
    Object.keys(updatedValues).forEach(
      (key) =>
        updatedValues[key as keyof typeof updatedValues] === '' &&
        delete updatedValues[key as keyof typeof updatedValues]
    );

    const body = {
      searchCriteria,
      updatedValues,
    };

    const hash = generateHash(JSON.stringify(body));
    try {
      await fetch('http://localhost:3000/v1/entity/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Hash': hash,
        },
        body: JSON.stringify({
          searchCriteria,
          updatedValues,
        }),
      });
      alert('Record updated successfully!');
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div className="record-form-container">
      <div className="tab">Update Record</div>
      <form onSubmit={handleSubmit}>
      <div className="side-by-side-inputs">
        <div className="form-group form-group-side-by-side">
          {/* <div className="side-by-side-inputs"> */}
            <label>Search Criteria:</label>
            <input
              type="text"
              value={searchCriteria.name}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={searchCriteria.email}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, email: e.target.value })
              }
              placeholder="Email"
            />
          {/* </div> */}
          {/* <div className="side-by-side-inputs"> */}
            <input
              type="tel"
              value={searchCriteria.mobile_number}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  mobile_number: e.target.value,
                })
              }
              placeholder="Mobile Number"
            />
            <div className="form-group form-group-side-by-side">
            <input
              type="date"
              style={{ width: "20000%" }}
              value={searchCriteria.date_of_birth}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  date_of_birth: e.target.value,
                })
              }
              placeholder="Date of Birth"
            />
            </div>
        </div>
      </div>
              
        <div className="side-by-side-inputs">      
        <div className="form-group form-group-side-by-side">
          {/* <div className="side-by-side-inputs"> */}
            <label>Updated Values:</label>
            <input
              type="text"
              value={updatedValues.name}
              onChange={(e) =>
                setUpdatedValues({ ...updatedValues, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={updatedValues.email}
              onChange={(e) =>
                setUpdatedValues({ ...updatedValues, email: e.target.value })
              }
              placeholder="Email"
            />
          {/* </div> */}
          {/* <div className="side-by-side-inputs"> */}
            <input
              type="tel"
              value={updatedValues.mobile_number}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  mobile_number: e.target.value,
                })
              }
              placeholder="Mobile Number"
            />

            <div className="form-group form-group-side-by-side">
            <input
              type="date"
              value={updatedValues.date_of_birth}
              onChange={(e) =>
                setUpdatedValues({
                  ...updatedValues,
                  date_of_birth: e.target.value,
                })
              }
              placeholder="Date of Birth"
            />
            </div>  
          {/* </div> */}
        </div>
        </div>
        <button type="submit" className="submit-button">Continue</button>
      </form>
    </div>
  );
};

export default UpdateRecordForm;
