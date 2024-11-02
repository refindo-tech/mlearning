export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$news from "@/backend/modules/news.module.js";
export async function DELETE(req){
    try {
        const authorization = req.headers.get('authorization');
        // response = await m$news
        const url = new URL(req.url)
        const params = url.searchParams
        const idNews = params.get('idNews')
        const verify = await middleware.authTeacher(authorization)
        let response
        if(verify.access){
            const payload = {
                idNews:parseInt(idNews)
            }
            response = await m$news.deleteNews(payload)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}