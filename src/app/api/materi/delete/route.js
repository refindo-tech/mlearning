import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$materi from "@/backend/modules/materi.module.js";
export async function DELETE(req){
    try {
        const authorization = req.headers.get('authorization');
        // response = await m$exam
        const url = new URL(req.url)
        const params = url.searchParams
        const idmateri = params.get('idmateri')
        const verify = await middleware.authTeacher(authorization)
        let response
        if(verify.access){
            const payload = {
                idmateri:parseInt(idmateri)
            }
            response = await m$materi.deleteMateri(payload)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}