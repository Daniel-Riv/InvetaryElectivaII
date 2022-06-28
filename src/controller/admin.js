const User = require('../models/user');
const unlockUser =async(req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'the email entered does not exist'
            });
        }
        user.status = true;
        user.attemps = 0;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'the user has been unlocked'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'the user has not been unlocked',
            error: error.message,
        })
    }
}
const unlocked = async(req,res)=>{
    try {
        const user = await User.find({ state: false });
        if (!user || user.length === 0) return res.status(400).json({
            success: false,
            message: 'There are no users blocked'
        });
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        });
    }
}

module.exports={
    unlockUser,
    unlocked
}