import { NextResponse } from "next/server";
import m$reset from "@/backend/modules/reset.module.js";
export async function PUT(req){
    try {
        const data = await req.json()
        const {token, email, password} = data
        const payload = {token,email,password}
        const response = await m$reset.resetPassword(payload)
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}