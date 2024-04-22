// import express from 'express'
// import cors from 'cors'
// import mongoose from 'mongoose'
// // import nodemon from 'nodemon'

// const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
// app.use(cors())

// mongoose.connect("mongodb://127.0.0.1:27017/streamIN", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true  
// }).then(() =>{
//     console.log("DB connected");
// }).catch(error =>{
//     console.error(error);
// })

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// })

// const User = new mongoose.model("User", userSchema)

// // Routes
// // app.post("/signup",(req,res) => {
// //     const {username , email, password} = req.body
// //     User.findOne({email : email}, (err, user) => {
// //         if(user){
// //             res.send({message: "User Already Exists!"})
// //             console.log("User already exists");
// //         }else{
// //             const user = new User({
// //                 username,
// //                 email,
// //                 password
// //             })
// //             user.save(err => {
// //                 if(err){
// //                     res.send(err)
// //                 }else{
// //                     console.log('successfull')
// //                     res.send( {message:"Sucessfully registered"})
// //                 }
// //             })
// //         }
// //     })
// // })

// app.post("/signup", async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email: email });

//         if (existingUser) {
//             res.status(200).send({ message: "Email Already Exists!" });
//         } else {
//             const user = new User({
//                 username,
//                 email,
//                 password
//             });

//             await user.save();
//             res.status(200).send({ message: "Successfully registered! You can Login now" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });


// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });

//         if (user) {
//             if (password === user.password) {
//                 // If password matches, send a success response with user data
//                 res.status(200).send({ message: "Login successfully", user });
//             } else {
//                 // If password doesn't match, send an error response
//                 res.status(200).send({ message: "Password didn't match!" });
//             }
//         } else {
//             // If no user found with the provided email, send an error response
//             res.status(200).send({ message: "User not registered" });
//         }
//     } catch (error) {
//         // If an error occurs during the try block, catch it here
//         console.error(error);
        
//         // Send an internal server error response
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });



// app.listen(9002, () =>{
//     console.log("BE started at port 9002!!!");
// })

// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import session from 'express-session';
// import crypto from 'crypto';

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/streamIN", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true  
// }).then(() =>{
//     console.log("DB connected");
// }).catch(error =>{
//     console.error(error);
// });

// // Generate a secret key for session encryption
// const secretKey = crypto.randomBytes(32).toString('hex');

// // Configure express-session middleware
// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 24 * 60 * 60 * 1000 // 1 day
//     }
// }));

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// });

// const User = new mongoose.model("User", userSchema);

// // Signup endpoint
// app.post("/signup", async (req, res) => {
//     // Signup logic
// });

// // Login endpoint
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });

//         if (user) {
//             if (password === user.password) {
//                 // Store user data in session upon successful login
//                 req.session.user = user;
//                 res.status(200).send({ message: "Login successfully", user });
//             } else {
//                 res.status(200).send({ message: "Password didn't match!" });
//             }
//         } else {
//             res.status(200).send({ message: "User not registered" });
//         }
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// // Logout endpoint
// app.post("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send({ message: "Internal Server Error" });
//         } else {
//             res.clearCookie('sessionID');
//             res.status(200).send({ message: "Logged out successfully" });
//         }
//     });
// });

// app.listen(9002, () => {
//     console.log("BE started at port 9002!!!");
// });

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import crypto from 'crypto';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/streamIN", {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() =>{
    console.log("DB connected");
}).catch(error =>{
    console.error(error);
});

// Generate a secret key for session encryption
const secretKey = crypto.randomBytes(32).toString('hex');

// Configure express-session middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        // secure: true, // Ensure cookie is only sent over HTTPS
        // sameSite: 'lax'
    }
}));

// User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

// Signup endpoint
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already registered" });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Store user data in session upon successful signup
        req.session.user = newUser;

        res.status(201).send({ message: "Signup successful", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (password === user.password) {
                // Store user data in session upon successful login
                req.session.user = user;
                res.status(200).send({ message: "Login successfully", user });
            } else {
                res.status(401).send({ message: "Incorrect password" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Logout endpoint
app.post("/logout", (req, res) => {
    try {
        req.session.destroy(); // Destroy the session
        res.clearCookie('sessionID'); // Clear session cookie
        res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Stream schema and model
const streamSchema = new mongoose.Schema({
    streamName : String,
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the user who created the stream
});

const Stream = mongoose.model("Stream", streamSchema);

// Middleware to validate session
// const validateSession = (req, res, next) => {
//     if (!req.session.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     next();
// };

app.post("/streams",(req,res) => {
    Stream.create(req.body)
    .then(streams => res.json(streams))
    .catch(err => res.json(err))
})

// app.post("/streams", (req, res) => {
//     const userId = req.session.user._id; // Get the ID of the logged-in user
//     const streamData = {
//         ...req.body,
//         userId: userId // Associate the stream with the logged-in user
//     };
//     Stream.create(streamData)
//         .then(streams => res.json(streams))
//         .catch(err => res.json(err));
// });

// app.post("/streams", validateSession, (req, res) => {
//     if (!req.session.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const userId = req.session.user._id;
//     const streamData = {
//         ...req.body,
//         userId: userId
//     };

//     Stream.create(streamData)
//         .then(stream => res.json(stream))
//         .catch(err => res.status(500).json({ message: "Internal Server Error", error: err }));
// });

// app.get('/', validateSession, (req, res) => {
//     if (!req.session.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const userId = req.session.user._id;
//     Stream.find({ userId: userId })
//         .then(streams => res.json(streams))
//         .catch(err => res.status(500).json({ message: "Internal Server Error", error: err }));
// });

app.get('/',(req,res) => {
    Stream.find({})
    .then(streams => res.json(streams))
    .catch(err => res.json(err))
})



app.delete('/deleteStream/:id', (req,res) => {
    const id = req.params.id;
    Stream.findByIdAndDelete({_id : id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.listen(9002, () => {
    console.log("BE started at port 9002!!!");
});
