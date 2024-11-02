export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$authentication from "@/backend/modules/authentication.module.js";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);
export async function POST(req) {
    try {
        const authorization = req.headers.get('authorization')
        const formData = await req.formData()
        const photo = formData.get('photo')
        let urlimage = null
        if (photo) {
            const imagename = photo.name
            const extensionIndex = imagename.lastIndexOf('.');
            const date = new Date()
            const dateTimestamp = date.getTime()
            const formattedName = `${imagename.substring(0, extensionIndex)}-${dateTimestamp}${imagename.substring(extensionIndex)}`
            const filePath = `./public/assets/image/${formattedName}`
            urlimage = `/assets/image/${formattedName}`
            await pump(photo.stream(), fs.createWriteStream(filePath))
        }
        const payload = JSON.parse(formData.get('payload'))
        const ProfileGuru = JSON.parse(formData.get('ProfileGuru'))
        // const payload = await req.json()
        const verify = await middleware.authTeacher(authorization)
        let response
        if (!verify.access) {
            response = verify
            return NextResponse.json({ message: response.message }, { status: response.code })
        }
        const payloadAddGuru = {
            payload: payload,
            ProfileGuru: { ...ProfileGuru, urlimage }
        }
        response = await m$authentication.AddGuru(payloadAddGuru)
        console.log(response)
        return NextResponse.json(response, { status: response.code })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}