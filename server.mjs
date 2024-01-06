import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users', {
    serverSelectionTimeoutMS: 30000, // 30 seconds
});



// Schema definition
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await newUser.save();
        console.log('User registered successfully!');
        console.log('User details:', newUser);
        res.send('User registered successfully!');
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.send('Error registering user.');
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
