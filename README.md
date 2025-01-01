
# **BoatIt Documentation**

## **Project Overview**
BoatIt is a React application that allows users to interact with a conversational AI interface. The app provides a feature to view past conversations and submit feedback on specific conversations.

---

## **File Structure**

```
/BOATIT
├── node_modules/                # Dependencies installed by npm
├── public/
│   └── assets/                  # Static assets like images
│   └── index.html               # Main HTML file
├── src/
│   ├── components/              # React components
│   │   └── Feedbackform.jsx     # Feedback form component
│   ├── db/                      # Database or mock data
│   │   └── sampleData.js        # Sample conversation data
│   ├── theme/                   # Styling and themes
│   ├── App.css                  # Styles for App component
│   ├── App.js                   # Main application component
│   ├── index.css                # Global styles
│   └── index.js                 # Main entry point for React app
├── .gitignore                   # Git ignore file
├── package-lock.json            # Lock file for npm dependencies
├── package.json                 # Project dependencies and scripts
└── README.md                    # Documentation file (this one)
```

---

## **Core Features**

1. **Conversation History**: 
   - Displays previous chat records.
   - Allows users to view and navigate through questions and answers.
   
2. **Feedback System**: 
   - Users can provide feedback on specific answers.
   - The feedback is stored and reflected in the conversation history.

---

## **Dependencies**

This project is built using the following dependencies:

- `@emotion/react`: ^11.14.0
- `@emotion/styled`: ^11.14.0
- `@mui/icons-material`: ^6.1.10
- `@mui/material`: ^6.1.10
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-redux`: ^9.1.2
- `string-similarity`: ^4.0.4

---

## **Component Breakdown**

### **1. App.js**

The main React component that renders the entire application interface. It includes:

- **State management**: Tracks state such as conversation history and feedback visibility.
- **Conditional rendering**: Displays past conversations or the feedback form based on user interaction.

### **2. Feedbackform.jsx**

A modal component that enables users to provide additional feedback on a specific answer from the conversation history. 

#### Key Features:
- **Feedback text area**: Allows users to write and submit feedback.
- **Submission logic**: Updates the chat history with the new feedback and closes the feedback form.
- **Styling**: Uses Material UI components to create a user-friendly modal interface.

### **3. sampleData.js**

Contains mock data used to simulate conversations in the app. It is used for testing and providing a source of data for rendering the past conversation history.

---

## **Usage**

1. **Run the app**: 
   - Ensure dependencies are installed by running `npm install`.
   - Start the application using `npm start`.

2. **Provide Feedback**: 
   - Click on any conversation item to open the feedback form.
   - Enter feedback and submit to update the conversation.

---

## **Running the Project Locally**

1. Clone the repository:
   ```bash
   git clone  https://github.com/yadav4646/BotAI.git
   cd boatit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

---

## **Future Improvements**

- Add real-time chat features using websockets.
- Implement user authentication for saving and accessing personal conversation history.
- Improve UI/UX for a smoother experience.
# BotAI
# BotAI
