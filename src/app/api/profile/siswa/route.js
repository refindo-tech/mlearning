import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$profile from "@/backend/modules/profile.module.js";
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        const verify = await middleware.authUser(authorization)
        let response
        if(!verify.access){
            response = verify
        }
        const payload = {
            idsiswa:verify.id,
        }
        // response = await m$exam
        response = await m$profile.detailProfile(payload)
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}