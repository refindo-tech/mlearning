import db from '@/backend/helpers/db.js'
import jwt from 'jsonwebtoken'
class _authaccess {
    authTeacher = async(req) =>{
        try {
            const token = req.split(' ')[1]
            if(!token){
                return{
                    code:404,
                    access:false,
                    message:'Not any token, you must login!',
                    error:error
                }
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(!decoded) throw new Error(decoded)
            const guru = await db.guru.findUnique({
                where:{
                    email:decoded.email
                },
                select:{
                    id:true,
                    ProfileGuru:{
                        select:{
                            name:true
                        }
                    }
                }
            })
            if(!guru){
                return{
                    code:404,
                    access:false,
                    message:'Not any teacher that have relevant token',
                    error:error
                }
            }
            return {
                access:true,
                ...guru
            }
        } catch (error) {
            console.log(error)
            return{
                access:false,
                message:error.message,
                error:error
            }
        }
    }
    authUser = async(req) =>{
        try {
            const token = req.split(' ')[1]
            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            if(!decoded) throw new Error(decoded)
            const user = await db.siswa.findUnique({
                where:{
                    email:decoded.email
                },
                select:{
                    id:true,
                    email:true,
                    ProfileSiswa:{
                        select:{
                            name:true,
                            kelas:true
                        }
                    }
                }
            })
            if(!user){
                return{
                    code:404,
                    access:false,
                    message:'Not any user that have relevant token',
                    error:error
                }
            }
            return {
                access:true,
                ...user
            }
        } catch (error) {
            console.log(error)
            return{
                access:false,
                message:error.message,
                error:error
            }
        }
    
    }
}
const middleware = new _authaccess()
export default middleware