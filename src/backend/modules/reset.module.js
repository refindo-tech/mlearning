import db from '../helpers/db.js'
import bcrypt from 'bcrypt'
class _reset {
    verifyToken = async (req) => {
        try {
            const { token, email } = req
            const siswa = await db.siswa.findUnique({
                where: { email }
            })
            const validateToken = bcrypt.compareSync(token, siswa.resetToken)
            if (!validateToken) {
                return {
                    status: false,
                    message: 'Token Not Valid',
                    code: 404
                }
            }
            const nowUTC = new Date(Date.now())
            if (siswa.expiredResetToken <= nowUTC) {
                return {
                    status: false,
                    message: 'Token was expired',
                    code: 400
                }
            }
            return {
                status: true,
                message: 'success validate token',
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Forgot Password Module Send Email Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    resetPassword = async (req) => {
        try {
            const { token, email, password } = req
            const siswa = await db.siswa.findUnique({ where: {email} })
            if (!siswa) {
                return {
                    status: false,
                    message: 'Account Not Found',
                    code: 404
                }
            }
            console.log(token)
            const validateToken = bcrypt.compareSync(token, siswa.resetToken)
            const hashingPassword = bcrypt.hashSync(password,10)
            if(!validateToken){
                return {
                    status: false,
                    message: 'Token Not Valid',
                    code: 400
                }
            }
            const update = await db.siswa.update({
                where: { email, resetToken:siswa.resetToken },
                data: {
                    password:hashingPassword,
                    updated_at: new Date()
                }
            })
            if(update){
                return {
                    status: true,
                    message: 'Reset Password Success',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Reset Module Reset Password Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    verifyTokenGuru = async (req) => {
        try {
            const { token, email } = req
            const guru = await db.guru.findUnique({
                where: { email }
            })
            const validateToken = bcrypt.compareSync(token, guru.resetToken)
            if (!validateToken) {
                return {
                    status: false,
                    message: 'Token Not Valid',
                    code: 404
                }
            }
            const nowUTC = new Date(Date.now())
            if (guru.expiredResetToken <= nowUTC) {
                return {
                    status: false,
                    message: 'Token was expired',
                    code: 400
                }
            }
            return {
                status: true,
                message: 'success validate reset token guru',
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Forgot Password Module Verify Token Guru Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    resetPasswordGuru = async (req) => {
        try {
            const { token, email, password } = req
            const guru = await db.guru.findUnique({ where: {email} })
            if (!guru) {
                return {
                    status: false,
                    message: 'Account Not Found',
                    code: 404
                }
            }
            const validateToken = bcrypt.compareSync(token, guru.resetToken)
            const hashingPassword = bcrypt.hashSync(password,10)
            if(!validateToken){
                return {
                    status: false,
                    message: 'Token Not Valid',
                    code: 400
                }
            }
            const update = await db.guru.update({
                where: { email, resetToken:guru.resetToken },
                data: {
                    password:hashingPassword,
                    updated_at: new Date()
                }
            })
            if(update){
                return {
                    status: true,
                    message: 'Reset Password Success',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Reset Module Reset Password Guru Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
}
const m$reset = new _reset()
export default m$reset