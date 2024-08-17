import { NextResponse } from "next/server";
import m$materi from "../../../../../../backend/modules/materi.module";
export default async function GET(){
    try {
        const response = await m$materi.listStasiun()
        return NextResponse({message:response.message, data:response.data}, {status:response.code})
    } catch (error) {
        return NextResponse({message:error.message}, {status:response.code})
    }
}