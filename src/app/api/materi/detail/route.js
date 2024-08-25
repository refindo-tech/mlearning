import { NextResponse } from "next/server";
import m$materi from "../../../../backend/modules/materi.module";
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        // Parsing URL untuk mendapatkan query parameters
        const url = new URL(req.url);
        const params = url.searchParams;
        const idmapel = params.get('idmapel');
        const stasiun = params.get('stasiun');
        const payload = {
            headers:authorization,
            idmapel : idmapel,
            stasiun: stasiun
        }
        const response = await m$materi.detailMateri(payload)
        // return NextResponse.json({message:authorization, data:params}, {status:200})
        return NextResponse.json({message:response.message, data:response.data}, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}