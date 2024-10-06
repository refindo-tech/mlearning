import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$exam from '@/backend/modules/exam.module.js'
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        // Parsing URL untuk mendapatkan query parameters
        const url = new URL(req.url);
        const params = url.searchParams;
        const idMataPelajaran = params.get('idmapel');
        const stasiun = params.get('stasiun');
        const verify = await middleware.authUser(authorization) 
        let response
        if(!verify.access){
            response = verify
        }
        const payload = {
            email: verify.email,
            idmapel : idMataPelajaran,
            stasiun:stasiun
        }
        response = await m$exam.listQuestionExam(payload)
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}