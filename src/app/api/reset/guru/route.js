export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import m$reset from "@/backend/modules/reset.module.js";
export async function GET(req){
    try {
        // Parsing URL untuk mendapatkan query parameters
        const url = new URL(req.url);
        const params = url.searchParams;
        const token = params.get('token');
        const email = params.get('email');
        const payload = {email,token}
        // response = await m$exam
        const response = await m$reset.verifyTokenGuru(payload)
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}