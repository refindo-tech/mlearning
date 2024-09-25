import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$diskusi from '@/backend/modules/discussion.module.js'
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
            response = await m$diskusi.createDicussion(payload)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}