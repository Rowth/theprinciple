const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
mongoose.connect(process.env.db_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
