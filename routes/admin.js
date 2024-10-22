const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User } = require("../db");
const {JWT_SECRET} = require("../config");
const router = Router();
jwt= require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: 'Admin created successfully' 
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    const user= await User.find({
        username,
        password
    })
    if(user){
        const token =jwt.sign({
            username
        }, JWT_SECRET);
        res.json({
            token
        })
    } else{
        res.status(411).json({
            message:"Incorrect email and password"
        })
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.bosy.title;
    const description=req.bosy.description;
    const imageLink=req.bosy.imageLink;
    const price=req.bosy.price;
    const newCourse= await Course.create({
        title,
        description,
        imageLink,
        price
    })
    //console.log(newCourse);
    res.json({
        message: 'Course created successfully', courseId: newCourse
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.json({
        courses
    })
});

module.exports = router;