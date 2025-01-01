import React, { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const FeedbackForm = ({ feedback, chathistory, setChatHistory, closeFeedback }) => {
  const [feedbackText, setFeedbackText] = useState("");

  // Renamed from handleSubmit
  const finalizeFeedbackSubmission = () => {
    if (!feedbackText.trim()) {
      alert("Please provide feedback before submitting.");
      return;
    }

    // Update the relevant part of the chat history with the provided feedback
    const updatedChatHistory = chathistory.map((item) => {
      if (item.type === "Answer" && item.qid === feedback.qid && item.id === feedback.id) {
        return { ...item, feedback: feedbackText };
      }
      return item;
    });

    setChatHistory(updatedChatHistory);
    closeFeedback(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        backgroundColor: "#00000033",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "40%",
          height: "15em",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f5ff",
        }}
      >
        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
            }}
          >
            <TipsAndUpdatesOutlinedIcon />
            <Typography>Provide Additional Feedback</Typography>
          </Box>
          <IconButton onClick={() => closeFeedback(false)}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 2,
            padding: "0.1em",
          }}
        >
          <TextareaAutosize
            minRows={9}
            placeholder="Write your feedback here..."
            style={{
              margin: "0 auto",
              width: "98%",
              border: "1px solid #ddd",
              padding: "0.5em",
              borderRadius: "5px",
              outline: "none",
            }}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              backgroundColor: "#d4b5f4",
              border: "none",
              borderRadius: "5px",
              padding: "0.5em 1em",
              cursor: "pointer",
              color: "#fff",
              fontSize: "0.9em",
            }}
            onClick={finalizeFeedbackSubmission}
          >
            Submit
          </button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;
