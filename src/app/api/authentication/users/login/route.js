export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import m$authentication from "@/backend/modules/authentication.module.js";
export async function POST(req){
    try {
        const payload = await req.json()
        const data = await m$authentication.login(payload)
        return NextResponse.json({message:data.message, token:data.token}, { status: data.code })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:error.message}, { status: 400 })
    }
}