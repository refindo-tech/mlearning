import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$exam from '@/backend/modules/exam.module.js'
export async function POST(req){
    try {
        const authorization = req.headers.get('authorization');
        const data = await req.json()
        // const {idsiswa,idmapel, stasiun, nilai} = data
        const verify = await middleware.authTeacher(authorization) 
        let response
        if(verify.access){
            // const payload = {idmapel, idsiswa, stasiun, nilai}
            const payload = data
            // response = await m$exam.answerExam(payload)
            response = await m$exam.createExam(payload)
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