import db from '@/backend/helpers/db.js'
import { access } from 'fs'
import jwt from 'jsonwebtoken'
const middleware = async(req) =>{
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
            throw new Error('Not any user that have relevant token')
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
export default middleware