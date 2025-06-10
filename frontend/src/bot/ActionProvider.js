class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.jobDescription = ''; // Store job description here
  }

  promptForJobDescription = () => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages.filter((msg) => msg.widget !== 'startButtonsWidget'),
        this.createChatBotMessage(
          "Please paste the job description you're hiring for below.",
          { widget: 'jobDescriptionWidget' }
        ),
      ],
    }));
  };

  handleJobDescription = (jdText) => {
    // Store the job description for later use
    this.jobDescription = jdText;
    
    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages.filter((msg) => msg.widget !== 'jobDescriptionWidget'),
        this.createChatBotMessage(
          "Thank you. I have received the job description. Shall we proceed to the resume upload?",
          { widget: 'confirmButtonsWidget' }
        ),
      ],
    }));
  };

  promptForResumes = () => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages.filter((msg) => msg.widget !== 'confirmButtonsWidget'),
        this.createChatBotMessage(
          "Great! Now, please provide the resumes for analysis.",
          { 
            widget: 'resumeUploadWidget',
            // Pass job description to the widget
            widgetProps: { jobDescription: this.jobDescription }
          }
        ),
      ],
    }));
  };

  handleResumeUpload = (files) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages.filter((msg) => msg.widget !== 'resumeUploadWidget'),
        this.createChatBotMessage(
          `Understood. Analyzing ${files.length} resume(s)...`
        ),
      ],
    }));

    setTimeout(() => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [
          ...prevState.messages.slice(0, -1),
          this.createChatBotMessage(
            "Analysis complete! You can now view the ranked results on your dashboard.",
            { widget: 'resultsWidget' }
          ),
        ],
      }));
    }, 2500);
  };

  handleViewResults = () => {
    window.dispatchEvent(new CustomEvent('navigate-to-dashboard'));
  };
}

export default ActionProvider;
