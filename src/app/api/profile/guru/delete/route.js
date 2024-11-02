export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$profile from "@/backend/modules/profile.module.js";
export async function DELETE(req){
    try {
        const authorization = req.headers.get('authorization');
        // response = await m$exam
        const url = new URL(req.url)
        const params = url.searchParams
        const idguru = params.get('idguru')
        const verify = await middleware.authTeacher(authorization)
        let response
        if(verify.access){
            const payload = {
                idguru:parseInt(idguru)
            }
            response = await m$profile.deleteProfileGuru(payload)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}