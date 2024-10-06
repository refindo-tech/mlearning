import { NextResponse } from "next/server";
import m$news from "@/backend/modules/news.module.js";
export async function GET(){
    try {
        const response = await m$news.listNews()
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}