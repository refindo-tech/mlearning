export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
//import m$uthentication from "@/backend/modules/authentication.module.js";
import m$kelas from '@/backend/modules/class.module.js'
export async function GET(req){
    try {
        const url = new URL(req.url)
        const data = await m$kelas.listClass(url.searchParams)
        return NextResponse.json({message:data.message, data:data.data}, { status: data.code })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, { status: 400 })
    }
}