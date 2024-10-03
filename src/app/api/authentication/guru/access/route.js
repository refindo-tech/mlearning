import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
export async function GET(req){
    try {
        const authorization = req.headers.get('authorization')
        const verify = await middleware.authTeacher(authorization)
        let response
        if(verify.access){
            response={
                status:true,
                access:true,
                code:200
            }
        }else{
            response={
                status:false,
                access:false,
                code:401
            }
        }
        return NextResponse.json(response, { status: response.code })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:error.message}, { status: 500 })
    }
}