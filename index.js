const app = require('./src/app');
const socketConfiguration = require('./src/config/socket/socket');

// Port configuration
const PORT = 8080;

// Server init
const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Socket Configuration
socketConfiguration(server);




