import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$exam from '@/backend/modules/exam.module.js'
export async function POST(req){
    try {
        const authorization = req.headers.get('authorization');
        const data = await req.json()
        const {idexam,idmapel, stasiun, answer} = data
        // Parsing URL untuk mendapatkan query parameters
        // const url = new URL(req.url);
        // const params = url.searchParams;
        // const idMataPelajaran = params.get('idmapel');
        // const stasiun = params.get('stasiun');
        const verify = await middleware(authorization) 
        let response
        if(!verify.access){
            response = verify
        }
        const payload = {
            idexam,
            idmapel,
            idsiswa: verify.id,
            stasiun:stasiun,
            answer
        }
        console.log(payload)
        // response = await m$exam.answerExam(payload)
        response = await m$exam.answerExam(payload)
        return NextResponse.json(response, {status:response.code})
        // return NextResponse.json(payload, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}