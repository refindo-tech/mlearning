import db from "../helpers/db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
class _authentication {
    register = async (req) => {
        const payload = req
        const {email, password, name} = payload
        const hashPassword = bcrypt.hashSync(password, 10)
        try {
            await db.siswa.create({
                data: {
                    email: email,
                    password: hashPassword,
                    ProfileSiswa:{
                        create:{
                            name:name
                        }
                    }
                }
            })
            return {
                message: 'success',
                code: 201
            }
        } catch (error) {
            if(error.code=== 'P2002'){
                return {
                    message: 'Email has used',
                    code: 400
                }
            }
            console.log({
                message:'Authentication Module Register Error',
                error:error.message
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    login = async (req)=>{
        const {email, password} = req
        try {
            const siswa = await db.siswa.findUnique({
                where:{
                    email:email
                },
                select:{
                    id:true,
                    email:true,
                    password:true,
                    ProfileSiswa:{
                        select:{
                            name:true,
                            kelas:true
                        }
                    }
                }
            })
            const authentication= bcrypt.compareSync(password,siswa.password)
            if(!authentication){
                return {
                    status: false,
                    code: 404,
                    message: "Password wrong, please fill with the correct password"
                }
            }
            const token = jwt.sign({
                id:siswa.id,
                email:siswa.email,
                name:siswa.ProfileSiswa[0]?.name,
                kelas: siswa.ProfileSiswa[0]?.kelas
            },process.env.SECRET_KEY,{expiresIn:'24h'})
            return {
                message: 'login success',
                token:token,
                code: 201
            }
        } catch (error) {
            console.log({
                message:'Authentication Module Login Error',
                error:error.message
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    registerGuru = async (req) => {
        const payload = req
        const {email, password, name} = payload
        const hashPassword = bcrypt.hashSync(password, 10)
        try {
            await db.guru.create({
                data: {
                    email: email,
                    password: hashPassword,
                    ProfileGuru:{
                        create:{
                            name:name
                        }
                    }
                }
            })
            return {
                message: 'success',
                code: 201
            }
        } catch (error) {
            if(error.code=== 'P2002'){
                return {
                    message: 'Email has used',
                    code: 400
                }
            }
            console.log({
                message:'Authentication Module Register Guru Error',
                error:error.message
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    loginGuru = async (req)=>{
        const {email, password} = req
        try {
            const guru = await db.guru.findUnique({
                where:{
                    email:email
                },
                select:{
                    id:true,
                    email:true,
                    password:true,
                    ProfileGuru:{
                        select:{
                            nuptk:true
                        }
                    }
                }
            })
            const authentication= bcrypt.compareSync(password,guru.password)
            if(!authentication){
                return {
                    status: false,
                    code: 404,
                    message: "Password wrong, please fill with the correct password"
                }
            }
            const token = jwt.sign({
                id:guru.id,
                email:guru.email,
                nuptk:guru.ProfileGuru[0]?.nuptk,
            },process.env.SECRET_KEY,{expiresIn:'24h'})
            return {
                message: 'login success',
                token:token,
                code: 201
            }
        } catch (error) {
            console.log({
                message:'Authentication Module Login Guru Error',
                error:error.message
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
}
const m$authentication = new _authentication()
export default m$authentication 