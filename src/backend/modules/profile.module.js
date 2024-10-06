import db from '../helpers/db.js'
class _profile {
    detailProfile = async (req) => {
        try {
            const { idsiswa } = req
            const detail = await db.profileSiswa.findFirst({
                where: {
                    idsiswa: parseInt(idsiswa)
                }
            })
            if (detail) {
                const detailWali = await db.profileWali.findFirst({
                    where: {
                        idsiswa: parseInt(idsiswa)
                    }
                })
                return {
                    status: true,
                    message: 'success',
                    data: {
                        siswa: detail,
                        wali: detailWali
                    },
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Detail Profile Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    editProfile = async (req) => {
        try {
            const { idsiswa, payload } = req
            const findProfile = await db.profileSiswa.findFirst({
                where: { idsiswa: parseInt(idsiswa) },
                select: {
                    id: true
                }
            })
            if (findProfile) {
                const edit = await db.profileSiswa.update({
                    where: { id:findProfile.id },
                    data: payload
                })
                if (!edit) {
                    return {
                        status: false,
                        message: 'Edit profile failed',
                        code: 400
                    }
                }
                return {
                    status: true,
                    message: 'success',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Edit Profile Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    editProfileWali = async (req) => {
        try {
            const { idsiswa, payload } = req
            const findProfile = await db.profileWali.findFirst({
                where: { idsiswa: parseInt(idsiswa) },
                select: {
                    id: true
                }
            })
            if (findProfile) {
                const edit = await db.profileWali.update({
                    where: { id:findProfile.id },
                    data: payload
                })
                if (!edit) {
                    return {
                        status: false,
                        message: 'Edit profile failed',
                        code: 400
                    }
                }
                return {
                    status: true,
                    message: 'success',
                    code: 200
                }
            } else{
                const create = await db.profileWali.create({
                    data: {
                        idsiswa:parseInt(idsiswa),
                        ...payload
                    }
                })
                if (!create) {
                    return {
                        status: false,
                        message: 'Create profile Wali failed',
                        code: 400
                    }
                }
                return {
                    status: true,
                    message: 'Create profile wali success',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Edit Profile Wali Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    deleteProfile = async (req) => {
        try {
            const { idsiswa } = req
            const deleteProfile = await db.siswa.delete({
                where: { id: parseInt(idsiswa) },
            })
            if(deleteProfile){
                return {
                    status: true,
                    message: 'Delete user berhasil',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Delete Profile Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    listProfile = async (req) => {
        try {
            const { limit, name } = req
            var list = []
            if(name && name !== ''){
                list = await db.siswa.findMany({
                    where:{
                        ProfileSiswa:{
                            some:{
                                name:{
                                    contains:name
                                }
                            }
                        }
                    },
                    select: {
                        ProfileSiswa: {
                            select: {
                                name: true,
                                nisn: true,
                                kelas: true,
                                idsiswa: true
                            }
                        }
                    },
                    take: parseInt(limit)
                })
            }else{
                list = await db.siswa.findMany({
                    select: {
                        ProfileSiswa: {
                            select: {
                                name: true,
                                nisn: true,
                                kelas: true,
                                idsiswa: true
                            }
                        }
                    },
                    take: parseInt(limit)
                })
            }
            const listProfileSiswa = list.map((item) => item.ProfileSiswa[0])
            return {
                status: true,
                message: 'List user berhasil',
                data: listProfileSiswa,
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module List Profile Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    listProfileGuru = async (req) => {
        try {
            const { limit, name } = req
            var list = []
            if(name && name !== ''){
                list = await db.guru.findMany({
                    where:{
                        ProfileGuru:{
                            some:{
                                name:{
                                    contains:name
                                }
                            }
                        }
                    },
                    select: {
                        ProfileGuru: {
                            select: {
                                idguru:true,
                                nuptk:true,
                                name:true,
                                start:true,
                                urlimage:true
                            }
                        }
                    },
                    take: parseInt(limit)
                })
            }else{
                list = await db.guru.findMany({
                    select: {
                        ProfileGuru: {
                            select: {
                                idguru:true,
                                nuptk:true,
                                name:true,
                                start:true,
                                urlimage:true
                            }
                        }
                    },
                    take: parseInt(limit)
                })
            }
            const listProfileGuru = list.map((item) => item.ProfileGuru[0])
            return {
                status: true,
                message: 'List Profile Guru Success',
                data: listProfileGuru,
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module List Profile Guru Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    detailProfileGuru = async (req) => {
        try {
            const { idguru } = req
            const detail = await db.profileGuru.findFirst({
                where: {
                    idguru: parseInt(idguru)
                },
                select:{
                    idguru:true,
                    name:true,
                    nuptk:true,
                    start:true,
                    urlimage:true,
                    ttl:true
                }
            })
            if(!detail){
                return{
                    status: false,
                    message: 'Not any data',
                    code: 404
                }
            }
            return {
                status: true,
                message: 'Detail Profile Guru Success',
                data:detail,
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Detail Profile Guru Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    editProfileGuru = async (req) => {
        try {
            const { idguru, payload } = req
            const findProfile = await db.profileGuru.findFirst({
                where: { idguru: parseInt(idguru) },
                select: {
                    id: true
                }
            })
            if (findProfile) {
                const edit = await db.profileGuru.update({
                    where: { id:findProfile.id },
                    data: payload
                })
                if (!edit) {
                    return {
                        status: false,
                        message: 'Edit profile guru failed',
                        code: 400
                    }
                }
                return {
                    status: true,
                    message: 'Edit profile guru success',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Edit Profile Guru Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    deleteProfileGuru = async (req) => {
        try {
            const { idguru } = req
            const deleteProfile = await db.guru.delete({
                where: { id: parseInt(idguru) },
            })
            if(deleteProfile){
                return {
                    status: true,
                    message: 'Delete Guru berhasil',
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Profile Module Delete Profile Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
}
const m$profile = new _profile()
export default m$profile