export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import m$materi from "@/backend/modules/materi.module.js";
export async function GET(){
    try {
        const response = await m$materi.listStasiun()
        return NextResponse.json({message:response.message, data:response.data}, {status:response.code})
    } catch (error) {
        return NextResponse.json({message:error.message}, {status:response.code})
    }
}