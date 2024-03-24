import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
// import nodemon from 'nodemon'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/streamIN", {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() =>{
    console.log("DB connected");
}).catch(error =>{
    console.error(error);
})

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

// Routes
// app.post("/signup",(req,res) => {
//     const {username , email, password} = req.body
//     User.findOne({email : email}, (err, user) => {
//         if(user){
//             res.send({message: "User Already Exists!"})
//             console.log("User already exists");
//         }else{
//             const user = new User({
//                 username,
//                 email,
//                 password
//             })
//             user.save(err => {
//                 if(err){
//                     res.send(err)
//                 }else{
//                     console.log('successfull')
//                     res.send( {message:"Sucessfully registered"})
//                 }
//             })
//         }
//     })
// })

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            res.status(200).send({ message: "Email Already Exists!" });
        } else {
            const user = new User({
                username,
                email,
                password
            });

            await user.save();
            res.status(200).send({ message: "Successfully registered! You can Login now" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            if (password === user.password) {
                // If password matches, send a success response with user data
                res.status(200).send({ message: "Login successfully", user });
            } else {
                // If password doesn't match, send an error response
                res.status(200).send({ message: "Password didn't match!" });
            }
        } else {
            // If no user found with the provided email, send an error response
            res.status(200).send({ message: "User not registered" });
        }
    } catch (error) {
        // If an error occurs during the try block, catch it here
        console.error(error);
        
        // Send an internal server error response
        res.status(500).send({ message: "Internal Server Error" });
    }
});



app.listen(9002, () =>{
    console.log("BE started at port 9002!!!");
})