import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$profile from '@/backend/modules/profile.module.js'
export async function PUT(req){
    try {
        const authorization = req.headers.get('authorization');
        const data = await req.json()
        const {idsiswa, payload} = data
        const verify = await middleware.authTeacher(authorization) 
        let response
        if(verify.access){
            const payloadEditProfile ={idsiswa, payload}
            response = await m$profile.editProfileWali(payloadEditProfile)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}