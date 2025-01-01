// src/App.js

import Grid from '@mui/material/Grid2';
import './App.css';
import questionbank from './db/sampleData';
import { Box, Button, Grid2, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import React, { useEffect, useState, useRef } from 'react';
import stringSimilarity from 'string-similarity';
import Feedbackform from './components/Feedbackform';

function App() {

  // Renamed from getCurrentTime
  function getLocalizedTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Renamed from formatDate
  function transformDate(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    // Compare dates to determine if it's today
    if (now.toDateString() === date.toDateString()) {
      return 'Today';
    }

    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (yesterday.toDateString() === date.toDateString()) {
      return 'Yesterday';
    }

    // Otherwise, return DD-MM-YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const [showPastConvo, setShowPastConvo] = useState(false);
  const [answerData, setAnswerData] = useState(questionbank);
  const [feedbackView, setFeedbackView] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const [fqstatus, setFQStatus] = useState(true);
  const [userQuerry, setUserQuerry] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Renamed from findRelevantAnswer
  const identifyRelevantAnswer = (query) => {
    if (!query.trim()) {
      return "As a chatbot, I can't help you with that.";
    }

    const matches = answerData.map((item) => ({
      ...item,
      similarity: stringSimilarity.compareTwoStrings(item.question.toLowerCase(), query.toLowerCase()),
    }));

    const bestMatch = matches.reduce(
      (prev, current) => (current.similarity > prev.similarity ? current : prev),
      { similarity: 0 }
    );

    return bestMatch.similarity > 0.2
      ? bestMatch.response
      : "As a chatbot, I can't help you with that.";
  };

  // Renamed from cardQuerry
  const initiateCardQuery = (querry) => {
    setUserQuerry(querry);
    processQuery();
  };

  // Renamed from handleQuerry
  const processQuery = () => {
    if (userQuerry) {
      setFQStatus(false);

      const newQuestionId = `${Date.now()}_Q0`;

      const questionIdWithRandom = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const answerIdWithRandom = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

      const questionSet = {
        type: 'Question',
        id: questionIdWithRandom,
        question: userQuerry,
        qid: newQuestionId,
      };

      const answerSet = {
        type: 'Answer',
        id: answerIdWithRandom,
        answer: identifyRelevantAnswer(userQuerry),
        qid: newQuestionId,
      };

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        questionSet,
        answerSet,
      ]);

      setUserQuerry('');
    }
  };

  const [chatName, setChatName] = useState("New Chat");
  const [chatNameEdit, setChatNameEdit] = useState(false);
  const [fetchSavedHistory, setFetchSavedHistory] = useState(
    JSON.parse(localStorage.getItem('history')) || []
  );

  // Renamed from saveHistory
  const recordConversation = () => {
    const item = {
      id: Date.now(),
      chatname: chatName,
      chathistory: chatHistory
    };

    let historyArray = [];

    if (localStorage.getItem('history')) {
      historyArray = JSON.parse(localStorage.getItem('history'));
    }

    historyArray.push(item);
    localStorage.setItem('history', JSON.stringify(historyArray));

    alert('Chat history has been successfully saved!');
  };

  return (
    <div className="App">
      <Grid container sx={{ height: '100vh' }}>
        {/* Menu Bar Layout */}
        <Grid size={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            p={1}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'secondary.main',
              width: '100%'
            }}
          >
            <Box
              height={40}
              width={40}
              sx={{
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden'
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Logo"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 'inherit',
                  boxShadow: 'inherit'
                }}
              />
            </Box>
            <TextField
              disabled={!chatNameEdit}
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: chatNameEdit ? 'default' : 'text',
                  fontSize: '1rem',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
            {chatNameEdit ? (
              <IconButton>
                <SaveAsIcon onClick={() => setChatNameEdit(false)} />
              </IconButton>
            ) : (
              <IconButton>
                <BorderColorOutlinedIcon onClick={() => setChatNameEdit(true)} />
              </IconButton>
            )}
          </Box>

          {showPastConvo ? (
            <Button
              onClick={() => setShowPastConvo(false)}
              sx={{
                padding: '0.8em 2em',
                marginTop: '1.5em',
                backgroundColor: 'secondary.main',
                color: 'black',
                borderRadius: '8px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
              variant="contained"
            >
              Back to Chat
            </Button>
          ) : (
            <Button
              onClick={() => setShowPastConvo(true)}
              sx={{
                padding: '0.8em 2em',
                marginTop: '1.5em',
                backgroundColor: 'secondary.main',
                color: 'black',
                borderRadius: '8px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
              variant="contained"
            >
              Past Conversations
            </Button>
          )}
        </Grid>

        {/* Main body content */}
        {!showPastConvo && (
          <Grid size={10} sx={{ background: 'linear-gradient(to bottom, #fff,#eee,#D7C7F4)' }}>
            <Grid container sx={{ height: '100%' }}>
              <Grid size={12} sx={{ height: '10%' }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: 'primary.main',
                    fontSize: '2em',
                    fontWeight: 'bold',
                    marginLeft: '0.5em',
                    marginTop: '0.2em',
                  }}
                >
                  Bot AI
                </Typography>
              </Grid>

              {fqstatus && (
                <Grid
                  size={12}
                  sx={{
                    height: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <Stack sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1em',
                      }}
                    >
                      <Typography variant="h3" sx={{ fontWeight: 'medium' }}>
                        How Can I Help You Today
                      </Typography>

                      <Box
                        height={60}
                        width={60}
                        sx={{
                          borderRadius: '50%',
                          boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.2)',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src="/assets/logo.png"
                          alt="Logo"
                          style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 'inherit',
                            boxShadow: 'inherit',
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ margin: '3em' }}>
                      <Grid container spacing={1}>
                        <Grid
                          size={6}
                          onClick={() => initiateCardQuery("Hi, What is the weather?")}
                        >
                          <Paper elevation={2} sx={{ padding: '1em', margin: '0.8em' }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{ fontWeight: 'bolder' }}
                            >
                              Hi, What is the weather
                            </Typography>
                            <Typography variant="body1">
                              Get immediate AI generated response
                            </Typography>
                          </Paper>
                        </Grid>

                        <Grid
                          size={6}
                          onClick={() => initiateCardQuery("Hi,What is my Location?")}
                        >
                          <Paper
                            elevation={2}
                            sx={{ padding: '1em', margin: '0.8em' }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{ fontWeight: 'bolder' }}
                            >
                              Hi, What is my Location
                            </Typography>
                            <Typography variant="body1">
                              Get immediate AI generated response
                            </Typography>
                          </Paper>
                        </Grid>

                        <Grid
                          size={6}
                          onClick={() => initiateCardQuery("Hi, What is the temperature?")}
                        >
                          <Paper elevation={2} sx={{ padding: '1em', margin: '0.8em' }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{ fontWeight: 'bolder' }}
                            >
                              Hi, What is the temperature
                            </Typography>
                            <Typography variant="body1">
                              Get immediate AI generated response
                            </Typography>
                          </Paper>
                        </Grid>

                        <Grid
                          size={6}
                          onClick={() => initiateCardQuery("Hi, how are you?")}
                        >
                          <Paper elevation={2} sx={{ padding: '1em', margin: '0.8em' }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{ fontWeight: 'bolder' }}
                            >
                              Hi, how are you
                            </Typography>
                            <Typography variant="body1">
                              Get immediate AI generated response
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </Grid>
              )}

              {!fqstatus && (
                <Grid
                  className="chatHistory"
                  size={12}
                  sx={{
                    height: '80vh',
                    maxHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '1em',
                    overflow: 'auto',
                    paddingBottom: '10px',
                  }}
                >
                  {chatHistory.length > 0 &&
                    chatHistory.map((chat) =>
                      chat.type === 'Question' ? (
                        <Paper
                          key={chat.id}
                          elevation={4}
                          sx={{
                            borderRadius: '1em',
                            display: 'flex',
                            width: '95%',
                            minHeight: '15%',
                          }}
                        >
                          <Box
                            sx={{
                              flex: '1',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ height: '4em', width: '4em', borderRadius: '50%' }}>
                              <img
                                src="/assets/user.png"
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 'inherit',
                                  boxShadow: 'inherit',
                                }}
                                alt="User"
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              flex: '10',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              padding: '0.4em',
                            }}
                          >
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                                You
                              </Typography>
                              <Typography variant="body2">{chat.question}</Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2">{getLocalizedTime()}</Typography>
                            </Box>
                          </Box>
                        </Paper>
                      ) : (
                        <Paper
                          key={chat.id}
                          className="ai_reply"
                          elevation={4}
                          sx={{
                            borderRadius: '1em',
                            display: 'flex',
                            width: '95%',
                            minHeight: '15%',
                          }}
                        >
                          <Box
                            sx={{
                              flex: '1',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ height: '4em', width: '4em', borderRadius: '50%' }}>
                              <img
                                src="/assets/logo.png"
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 'inherit',
                                  boxShadow: 'inherit',
                                }}
                                alt="AI"
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              flex: '10',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              padding: '0.4em',
                            }}
                          >
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                                AI
                              </Typography>
                              <Typography variant="body2">{chat.answer}</Typography>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '1em',
                              }}
                            >
                              <Box>
                                <Typography variant="body2">{getLocalizedTime()}</Typography>
                              </Box>
                              <Box className="feedback_container">
                                <IconButton>
                                  <ThumbUpOffAltIcon sx={{ fontSize: 'medium' }} />
                                </IconButton>
                                <IconButton
                                  onClick={() => {
                                    setFeedbackData({
                                      id: chat.id,
                                      qid: chat.qid,
                                    });
                                    setFeedbackView(true);
                                  }}
                                >
                                  <ThumbDownOffAltIcon sx={{ fontSize: 'medium' }} />
                                </IconButton>
                              </Box>
                            </Box>
                          </Box>
                        </Paper>
                      )
                    )}
                </Grid>
              )}

              {/* Chat input interface */}
              <Grid size={12} sx={{ height: '10%' }}>
                <Grid container sx={{ height: '100%' }}>
                  <Grid
                    size={10}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      value={userQuerry}
                      onChange={(e) => setUserQuerry(e.target.value)}
                      sx={{
                        backgroundColor: '#fff',
                        '& .MuiInputBase-root': {
                          height: '3em',
                          borderRadius: '12px',
                        },
                        width: '98%',
                        borderRadius: '12px',
                      }}
                    />
                  </Grid>

                  <Grid
                    size={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '1em',
                    }}
                  >
                    <Button variant="contained" onClick={processQuery}>
                      Ask
                    </Button>
                    <Button variant="contained" onClick={recordConversation}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Past Conversations */}
        {showPastConvo && (
          <Grid size={10} sx={{ background: 'linear-gradient(to bottom, #fff,#eee,#D7C7F4)' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '2em 0' }}>
              Conversation History
            </Typography>

            {fetchSavedHistory && fetchSavedHistory.length > 0 ? (
              fetchSavedHistory
                .reverse()
                .map((record) => (
                  <React.Fragment id={record.id} key={record.id}>
                    <Typography variant="h5" sx={{ padding: '1em' }}>
                      {transformDate(record.id)}
                    </Typography>

                    <Box
                      sx={{
                        minHeight: '60vh',
                        overflowY: 'scroll',
                        padding: '1em',
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch',
                        '&::-webkit-scrollbar': {
                          display: 'none',
                        },
                      }}
                    >
                      {record.chathistory.map((chat) =>
                        chat.type === 'Question' ? (
                          <Box
                            id={chat.id}
                            sx={{
                              borderTopLeftRadius: '1.5em',
                              borderTopRightRadius: '1.5em',
                              padding: '1em',
                              backgroundColor: 'primary.main',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: '1em',
                            }}
                          >
                            <Box
                              sx={{
                                height: '5em',
                                width: '5em',
                                flex: 1,
                                borderRadius: '50%',
                                boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.2)',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src="/assets/user.png"
                                alt="Logo"
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 'inherit',
                                  boxShadow: 'inherit',
                                }}
                              />
                            </Box>

                            <Box sx={{ flex: 14, marginTop: '1em' }}>
                              {chat.question}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              padding: '1em',
                              backgroundColor: 'primary.main',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              gap: '1em',
                              marginBottom: '1em',
                              borderBottomLeftRadius: '1.5em',
                              borderBottomRightRadius: '1.5em',
                            }}
                          >
                            <Box
                              sx={{
                                height: '5em',
                                width: '5em',
                                flex: 1,
                                borderRadius: '50%',
                                boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.2)',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src="/assets/logo.png"
                                alt="Logo"
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 'inherit',
                                  boxShadow: 'inherit',
                                }}
                              />
                            </Box>

                            <Box sx={{ flex: 14, marginTop: '1em' }}>
                              {chat.answer}
                              {chat.feedback ? (
                                <Typography variant="body1" sx={{ marginTop: '1em', fontWeight: 'bolder' }}>
                                  Feedback:
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ marginLeft: '1em' }}
                                  >
                                    {chat.feedback}
                                  </Typography>
                                </Typography>
                              ) : (
                                ''
                              )}
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  </React.Fragment>
                ))
            ) : (
              "Kono chat nai"
            )}
          </Grid>
        )}
      </Grid>

      {feedbackView && (
        <Feedbackform
          feedback={feedbackData}
          chathistory={chatHistory}
          closeFeedback={setFeedbackView}
          setChatHistory={setChatHistory}
        />
      )}
    </div>
  );
}

export default App;
