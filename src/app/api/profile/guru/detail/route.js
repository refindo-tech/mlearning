export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$profile from "@/backend/modules/profile.module.js";
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        const url = new URL(req.url)
        const params = url.searchParams
        const idguru = params.get('idguru')
        const verify = await middleware.authTeacher(authorization)
        // response = await m$exam
        let response
        if(verify.access){
            const payload = {
                idguru
            }
            response = await m$profile.detailProfileGuru(payload)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}