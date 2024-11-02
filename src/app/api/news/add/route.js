export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$news from '@/backend/modules/news.module.js'
export async function POST(req){
    try {
        const authorization = req.headers.get('authorization');
        const data = await req.json()
        const verify = await middleware.authTeacher(authorization) 
        let response
        if(verify.access){
            const payload = data
            console.log(payload)
            // response = await m$exam.answerExam(payload)
            response = await m$news.addNews(payload)
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