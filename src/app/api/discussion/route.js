export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import m$diskusi from "../../../backend/modules/discussion.module";
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization');
        // Parsing URL untuk mendapatkan query parameters
        const url = new URL(req.url);
        const params = url.searchParams;
        const idMataPelajaran = params.get('idmapel');
        const stasiun = params.get('stasiun');
        const payload = {
            headers:authorization,
            idmapel : idMataPelajaran,
            stasiun:stasiun
        }
        const response = await m$diskusi.detailDiscussion(payload)
        return NextResponse.json({message:response.message, data:response.data}, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}