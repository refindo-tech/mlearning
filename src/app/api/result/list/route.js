export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$result from '@/backend/modules/result.module.js'
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        // Parsing URL untuk mendapatkan query parameters
        // const url = new URL(req.url);
        // const params = url.searchParams;
        // const idmapel = params.get('idmapel');
        // const stasiun = params.get('stasiun');
        // const limit = params.get('limit');
        const verify = await middleware.authTeacher(authorization) 
        let response
        if(verify.access){
            // const payload = {
            //     idmapel : idmapel,
            //     stasiun:stasiun,
            //     limit:limit
            // }
            response = await m$result.listResultSiswa()
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}