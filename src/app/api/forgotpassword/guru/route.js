export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import m$fpassword from "@/backend/modules/forgotPassword.module.js";
export async function POST(req){
    try {
        const data = await req.json()
        const {email} = data
        const payload = {
            email
        }
        const response = await m$fpassword.sendEmailGuru(payload)
        return NextResponse.json(response, {status:response.code})
        // return NextResponse.json(payload, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}