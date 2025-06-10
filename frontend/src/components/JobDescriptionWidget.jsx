import React, { useState } from 'react';
import './WidgetStyles.css';

const JobDescriptionWidget = (props) => {
  const [jobDescription, setJobDescription] = useState('');
  const { actionProvider } = props;

  const handleSubmit = () => {
    if (jobDescription.trim() === '') {
      return; 
    }
    actionProvider.handleJobDescription(jobDescription);
  };

  return (
    <div className="widget-container">
      <textarea
        className="widget-textarea"
        placeholder="Paste the full job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button className="widget-button" onClick={handleSubmit}>
        Submit Description
      </button>
    </div>
  );
};

export default JobDescriptionWidget;
