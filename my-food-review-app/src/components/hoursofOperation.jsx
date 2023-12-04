import React, { useState } from 'react';
    
const HoursOfOperation = ({ setFieldValue, values }) => {

  const handleHoursChange = (day, openOrClose, value) => {
    setFieldValue(`hoursOfOperation.${day}.${openOrClose}`, value);
  };

  return (
    <div>
      {Object.entries(values).map(([day, times]) => (
        <div key={day} className="row mb-3">
          <div className="col">
            <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
          </div>
          <div className="col">
            <input
              type="time"
              className="form-control"
              value={values[day].open}
              onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
              placeholder="Open Time"
            />
          </div>
          <div className="col">
            <input
              type="time"
              className="form-control"
              value={times.close}
              onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
              placeholder="Close Time"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoursOfOperation;
