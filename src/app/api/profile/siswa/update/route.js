import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$profile from '@/backend/modules/profile.module.js'
export async function PUT(req){
    try {
        const authorization = req.headers.get('authorization');
        const data = await req.json()
        const {idsiswa, payload} = data
        // Parsing URL untuk mendapatkan query parameters
        // const url = new URL(req.url);
        // const params = url.searchParams;
        // const idMataPelajaran = params.get('idmapel');
        // const stasiun = params.get('stasiun');
        const verify = await middleware.authTeacher(authorization) 
        let response
        // if(!verify.access){
        //     response = verify
        // }
        if(verify.access){
            const payloadEditProfile ={idsiswa, payload}
            console.log(payloadEditProfile)
            // response = await m$profile.answerExam(payloadEditProfile)
            response = await m$profile.editProfile(payloadEditProfile)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
        // return NextResponse.json(payload, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}