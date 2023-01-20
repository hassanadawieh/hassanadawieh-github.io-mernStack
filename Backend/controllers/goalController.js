const asyncHandler = require('express-async-handler')

//@desc      Get goals
//@route     Get /api/goals
//@access    private

const getGoal = asyncHandler( async (req , res ) => {
    res.status(200).json({ message : `Get Goals`})
})

//@desc      Set goals
//@route     POST /api/goals
//@access    private

const setGoal = asyncHandler( async (req , res ) => {
if(!req.body.text){
    res.status(404)
    throw new Error('please add a text field')
}

     res.status(200).json({ message: "Set Goals" });
})

//@desc      Update goals
//@route     put /api/goals/:id
//@access    private

const updateGoal =asyncHandler( async (req , res ) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}` });
})

//@desc      Delete goals
//@route     Delete /api/goals/:id
//@access    private

const deleteGoal = asyncHandler( async (req , res ) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}` });
})


module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}