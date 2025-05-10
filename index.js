const app = require('./src/app');
const socketConfiguration = require('./src/config/socket/socket');
require("dotenv").config();

// Port configuration
const PORT = process.env.PORT;

// Server init
const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Socket Configuration
socketConfiguration(server);




