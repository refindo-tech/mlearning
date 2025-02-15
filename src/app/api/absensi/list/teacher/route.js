export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$absensi from "@/backend/modules/absensi.module.js";
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        // Parsing URL untuk mendapatkan query parameters
        const url = new URL(req.url);
        const params = url.searchParams;
        const idmapel = params.get('idmapel');
        const stasiun = params.get('stasiun');
        const limit = params.get('limit');
        const name = params.get('name');
        const verify = await middleware.authTeacher(authorization) 
        let response
        if(verify.access){
            let payload = {
                stasiun,
                idmapel : parseInt(idmapel),
                limit:parseInt(limit)
            }
            if(name){
                payload={
                    stasiun,
                    idmapel : parseInt(idmapel),
                    limit:parseInt(limit),
                    name
                }
            }
            // response = await m$exam
            response = await m$absensi.getAbsensiForTeacher(payload)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}