const MultiSelectCheckbox = ({ options, selectedOptions, setSelectedOptions, label }) => {
    const handleCheckboxChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    };
  
    return (
      <div className="form-group">
        <label>{label}</label>
        <div style={{ height: '150px', overflowY: 'auto' }}>
          {options.map(option => (
            <div key={option} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox-${option}`}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <label className="form-check-label" htmlFor={`checkbox-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default MultiSelectCheckbox;