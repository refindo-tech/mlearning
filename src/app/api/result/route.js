import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$result from "@/backend/modules/result.module.js";
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        // Parsing URL untuk mendapatkan query parameters
        const url = new URL(req.url);
        const params = url.searchParams;
        const idmapel = params.get('idmapel');
        const verify = await middleware(authorization) 
        let response
        if(!verify.access){
            response = verify
        }
        const payload = {
            idsiswa:parseInt(verify.id),
            idmapel : parseInt(idmapel)
        }
        // response = await m$exam
        response = await m$result.getResultSiswa(payload)
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}