import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import { OAuth2Client } from 'google-auth-library';


const app = express();
const port = process.env.PORT || 4000;
const googleClient = new OAuth2Client("213842657098-jppcg1cul11sthuhc1717eq15f8btapq.apps.googleusercontent.com");
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true
}))

//api endpoints
app.get('/',(req, res)=>{
    res.send("Api is working")
})
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: "213842657098-jppcg1cul11sthuhc1717eq15f8btapq.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();

    // Find or create a user in your MongoDB database
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
      await user.save();
    } else {
      // You could update their profile here if needed
      user.name = payload.name;
      user.picture = payload.picture;
      await user.save();
    }

    // Return a response to the front-end (e.g., a session token or success message)
    res.json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.use('/api/auth', authRouter)

app.listen(port,()=>{
    console.log(`server is running on: ${port}`)
})