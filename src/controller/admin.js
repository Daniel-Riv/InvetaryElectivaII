const User = require('../models/user');
const unlockUser =async(req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        console.log(user)
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'El correo ingresado no existe'
            });
        }
        user.state = true;
        user.attemps = 0;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'El usuario ha sido activado'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        })
    }
}
const unlocked = async(req,res)=>{
    try {
        const user = await User.find({ state: false });
        if (!user || user.length === 0) return res.status(400).json({
            success: false,
            message: 'NO hay usuarios bloqueados'
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