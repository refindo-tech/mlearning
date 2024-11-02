export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import middleware from '@/backend/helpers/middleware.js'
import m$profile from '@/backend/modules/profile.module.js'
import fs from 'fs'
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline)
export async function PUT(req){
    try {
        const authorization = req.headers.get('authorization');
        const formData = await req.formData()
        const photo = formData.get('photo')
        const idsiswa = formData.get('idsiswa')
        const payload = JSON.parse(formData.get('payload'))
        let urlimage
        if(photo){
            const imagename = photo.name
            const extensionIndex = imagename.lastIndexOf('.')
            const date = new Date()
            const dateTimestamp = date.getTime()
            const formattedName = `${imagename.substring(0,extensionIndex)}-${dateTimestamp}${imagename.substring(extensionIndex)}`
            const folderpath = `./public/assets/image/${formattedName}`
            urlimage = `/assets/image/${formattedName}`
            await pump(photo.stream(), fs.createWriteStream(folderpath))
        }
        const verify = await middleware.authTeacher(authorization) 
        let response
        if(verify.access){
            const payloadEditProfile ={
                idsiswa:parseInt(idsiswa),
                payload:{...payload,urlimage}
            }
            response = await m$profile.editProfile(payloadEditProfile)
        }else{
            response = verify
        }
        return NextResponse.json(response, {status:response.code})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error.message}, {status:400})
    }
}