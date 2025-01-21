// Problem 1: Set Up the Express.js Application
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware for logging
app.use((req, res, next) => {
  // Problem 2: Implement Middleware to Capture Request Details
  const logEntry = {
    timestamp: new Date().toISOString(), 
    ip: req.ip || req.connection.remoteAddress,
    url: req.originalUrl, 
    protocol: req.protocol, 
    method: req.method, 
    hostname: req.hostname, 
    query: req.query, 
    headers: req.headers, 
    userAgent: req.get('User -Agent'), 
  };

  const logData = JSON.stringify(logEntry) + "\n";
  const logFilePath = path.join(__dirname, "requests.log"); 

  // Problem 3: Use the fs Module to Write Request Details to a File
  // Define maximum log file size for rotation
  const maxLogSize = 1 * 1024 * 1024; // 1MB

  
  fs.stat(logFilePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFile(logFilePath, '', (err) => {
          if (err) {
            console.error("Error creating log file:", err);
          }
        });
      } else {
        console.error("Error checking log file size:", err);
      }
    } else if (stats.size >= maxLogSize) {
      const newLogFilePath = path.join(__dirname, `requests_${Date.now()}.log`);
      fs.rename(logFilePath, newLogFilePath, (err) => {
        if (err) {
          console.error("Error rotating log file:", err);
        } else {
          console.log(`Log file rotated to: ${newLogFilePath}`);
        }
      });
    }

    // Append the new log entry to the log file
    fs.appendFile(logFilePath, logData, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });

    console.log(logEntry); 

    next(); 
  });
});

app.get("/", (req, res) => {
  res.send("Server is running!"); 
});

app.get("/about", (req, res) => {
  res.send("About page!");
});

// Problem 4: Test the Logging Functionality
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`); 
});

// Problem 5: Optional Advanced Features
// 1. Log Rotation: Implemented above to rotate the log file when it reaches 1MB.
// 2. Enhanced Logging: Additional details are already included in the log entry (query parameters, headers, user-agent).