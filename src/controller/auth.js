const User = require('../models/user');
const { generateJWT } = require('../helper/jwt');
const bcrypt = require('bcryptjs');
const password = require('../helper/generate-password');
const sendEmail = require('../helper/nodemailer');

const signUp = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email }, { password: 0, oldPassword: 0 });
        if (user) {
            return res.status(400).json({
                success: false,
                error: 'El correo ya existe en la base de datos'
            });
        }
        user = new User(req.body);
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        user.oldPassword.push(user.password);
        await user.save();
        await sendEmail({
            email: user.email,
            subject: 'Bienvenido al inventario de la miscelanea',
            message: `Hola ${user.name} ${user.lastName},enviamos la contraseña para ingresar al aplicativo web -> ${password} <- Recuerda cambiarla al ingresar`
        })
        const token = await generateJWT(
            user.id,
            user.name,
            user.lastName,
            user.email,
            user.firstLogin,
            user.state
        )
        return res.status(200).json({
            success: true,
            validation: user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })

    }
}
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validation = await User.findOne({ email });//,{password: 0, oldPassword: 0}
        if (!validation) {
            return res.status(400).json({
                success: false,
                error: 'El correo ingresado no esta registrado',
            });
        }
        const compareValidation = bcrypt.compareSync(password, validation.password);
        if (!compareValidation && validation.state == true) {
            if (validation.attempts < 3) {
                validation.attempts += 1;
                if (validation.attempts === 3) {
                    validation.state = false;
                }
                await validation.save();
            }
            return res.status(400).json({
                success: false,
                error: 'La contraseña ingresada es incorrecta',
            });
        }
        if (validation.state === false) {
            return res.status(400).json({
                success: false,
                    error: 'Su usuario sera desctivado,Por favor comuniquese con el administrador',
                }) 
        }
        validation.attempts = 0;
        await validation.save();
        const token = await generateJWT(
            validation.id,
            validation.name,
            validation.lastName,
            validation.email,
            validation.firstLogin,
            validation.state,
        );
        return res.status(200).json({
            success: true,
            validation,
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }


}

const changeOfPassword = async (req, res) => {
    const { email } = req.params;
    const { newPassword } = req.body;
    try {
        const validation = await User.findOne({ email });//,{password: 0, oldPassword: 0}
        if (!validation) {
            return res.status(400).json({
                success: false,
                error: 'El correo ingresado no existe'
            });
        }
        const result = validation.oldPassword.some(old => bcrypt.compareSync(newPassword, old)); // boolean
        if (result) {
            return res.status(400).json({
                success: false,
                error: 'La contraseña ingresada ya fue usada ingrese una nueva',
            });
        } else {
            if (validation.oldPassword.length === 2) {
                validation.oldPassword.pop();
            }
        }
        const salt = bcrypt.genSaltSync(10);
        validation.password = bcrypt.hashSync(newPassword, salt);
        validation.oldPassword.unshift(validation.password);
        validation.firstLogin = false;
        await validation.save();
        return res.status(200).json({
            success: true,
            newPassword
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const forgotPassword =async(req,res)=>{
    try {
        const {email} = req.body;
        const user  = await User.findOne({email});
    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'El correo no existe'
        });
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    await sendEmail({
        email: user.email,
        subject: 'ForgotPassword',
        message: `Tu nueva contraseña es:  ${password} `
    })
    return res.status(200).json({
        success: true,
        message: 'La contraseña fue enviada al correo ingresado'
    });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
    


}
const validationToken  =async (req,res)=>{
    try {
        res.status(200).json({
            success:true,
            message:' toke is valid'
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            error: message.error
        }) 
    }
}
module.exports = {
    signUp,
    signIn,
    changeOfPassword,
    forgotPassword,
    validationToken
}