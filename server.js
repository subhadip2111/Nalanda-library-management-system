const app = require('./app');

// Set the port from environment variables or default to 4000
const PORT =  4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
