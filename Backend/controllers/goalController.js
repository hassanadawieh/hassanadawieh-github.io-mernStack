const asyncHandler = require('express-async-handler')



const Goal = require('../models/goalModel')
const User = require("../models/userModel")  

//@desc      Get goals
//@route     Get /api/goals
//@access    private

const getGoal = asyncHandler( async (req , res ) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

//@desc      Set goals
//@route     POST /api/goals
//@access    private

const setGoal = asyncHandler( async (req , res ) => {
if(!req.body.text){
    res.status(404)
    throw new Error('please add a text field')
}

const goal = await Goal.create({
    text : req.body.text,
    user : req.user.id
})

     res.status(200).json(goal);
})

//@desc      Update goals
//@route     put /api/goals/:id
//@access    private

const updateGoal =asyncHandler( async (req , res ) => {
    const goal = await Goal.findById(req.params.id)


if(!goal) {
    res.status(404)
    throw new Error ('Goal not found')
}

//Make sure the logged in user matches the goal user
if(goal.user.toString() !== user.id){
res.status(401)
throw new Error('user not authorized')
}

const  user = await User.findById(req.user.id)

// Check for user
if(!user) {
res.status(401)
throw new Error ('user not found')
}

const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
     req.body,
      {
        new :true,
    })

    res.status(200).json(updatedGoal);
})

//@desc      Delete goals
//@route     Delete /api/goals/:id
//@access    private

const deleteGoal = asyncHandler( async (req , res ) => {
        const goal = await Goal.findById(req.params.id);

        if (!goal) {
          res.status(404);
          throw new Error("Goal not found");
        }

        await goal.remove()
        

        res.status(200).json({id : req.params.id});
})


module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}