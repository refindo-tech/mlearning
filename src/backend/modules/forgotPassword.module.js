import nodemailer from 'nodemailer'
import db from '@/backend/helpers/db.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
// import { today,getLocalTimeZone } from '@internationalized/date'
// import { requestAsyncStorage } from 'next/dist/client/components/request-async-storage-instance'
class _fpassword {
    sendEmail = async (req) => {
        try {
            const { email } = req
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = await bcrypt.hash(resetToken, 10);
            const findSiswa = await db.siswa.findUnique({
                where: { email }
            })
            if (findSiswa) {
                await db.siswa.update({
                    where: { email },
                    data: {
                        resetToken: hashedToken,
                        expiredResetToken:new Date(Date.now()+ 15 * 60 * 1000), // Token valid 1 jam
                    },
                });
            } else {
                return {
                    status: false,
                    message: 'Email user not found',
                    code: 404
                }
            }
            const resetUrl = `${process.env.NEXT_PUBLIC_BASE_API}/reset?t=${resetToken}&e=${email}`
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.ADDRESS_EMAIL}`,
                    pass: `${process.env.EMAIL_PASSWORD}`,
                },
            });
            const send = await transporter.sendMail({
                from: '"no-reply" <noreply@mlearning.com>', // sender address
                to: `${email}`, // list of receivers
                subject: "Request reset password", // Subject line
                text: "Silahkan anda mengunjungi link berikut", // plain text body
                html: `<a href=${resetUrl}>${resetUrl}</a>`, // html body
            })
            if (send) {
                console.log('success', send.messageId)
                return {
                    status: true,
                    message: 'success',
                    code: 200
                }
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
    sendEmailGuru = async (req) => {
        try {
            const { email } = req
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = await bcrypt.hash(resetToken, 10);
            const findGuru = await db.guru.findUnique({
                where: { email }
            })
            if (findGuru) {
                await db.guru.update({
                    where: { email },
                    data: {
                        resetToken: hashedToken,
                        expiredResetToken:new Date(Date.now()+ 15 * 60 * 1000), // Token valid 1 jam
                    },
                });
            } else {
                return {
                    status: false,
                    message: 'Email guru not found',
                    code: 404
                }
            }
            const resetUrl = `${process.env.NEXT_PUBLIC_BASE_API}/resetguru?t=${resetToken}&e=${email}`
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.ADDRESS_EMAIL}`,
                    pass: `${process.env.EMAIL_PASSWORD}`,
                },
            });
            const send = await transporter.sendMail({
                from: '"no-reply" <noreply@mlearning.com>', // sender address
                to: `${email}`, // list of receivers
                subject: "Request reset password", // Subject line
                text: "Silahkan anda mengunjungi link berikut", // plain text body
                html: `<a href=${resetUrl}>${resetUrl}</a>`, // html body
            })
            if (send) {
                console.log('success', send.messageId)
                return {
                    status: true,
                    message: 'success',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Forgot Password Guru Module Send Email Error',
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
const m$fpassword = new _fpassword()
export default m$fpassword