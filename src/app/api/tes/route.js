import { NextResponse } from "next/server";
import m$uthentication from "@/backend/modules/authentication.module.js";
export async function GET(){
    try {
        const data = await m$uthentication.register()
        console.log(data)
        return NextResponse.json({message:data}, { status: 200 })
    } catch (error) {
        return NextResponse.json({message:error.message}, { status: 4000 })
    }
}