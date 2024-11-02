export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$absensi from '@/backend/modules/absensi.module.js'
export async function POST(req){
    try {
        const authorization = req.headers.get('authorization');
        const data = await req.json()
        const {idmapel, stasiun, idmateri} = data
        const verify = await middleware.authUser(authorization) 
        let response
        if(!verify.access){
            response = verify
        }
        const payload = {
            idmapel,
            idsiswa: verify.id,
            stasiun:stasiun,
            idmateri
        }
        response = await m$absensi.addAbsen(payload)
        return NextResponse.json(response, {status:response.code})
        // return NextResponse.json(payload, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}