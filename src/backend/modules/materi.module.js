import db from '../helpers/db'
class _materi {
    listStasiun = async (req) => {
        try {
            const { idmatapelajaran } = req
            const list = await db.materi.findMany({
                where: {
                    idmatapelajaran: parseInt(idmatapelajaran)
                }
            })
            console.log(list)
            return {
                message: 'success',
                data: list,
                code: 200
            }
        } catch (error) {
            console.log({
                message: 'Materi Module List Stasiun Error',
                error: error.message,
                code: 500
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    detailMateri = async (req) => {
        try {
            const { idmapel, stasiun } = req
            let detail
            if (idmapel) {
                if (stasiun) {
                    detail = await db.materi.findFirst({
                        where: {
                            idmatapelajaran: parseInt(idmapel),
                            stasiun: stasiun
                        },
                        include: {
                            MataPelajaran: {
                                select: {
                                    name: true,
                                    kelas: true,
                                    description: true
                                }
                            }
                        }
                    })
                } else {
                        detail = await db.mataPelajaran.findFirst({
                            where: {
                                id: parseInt(idmapel),
                            },
                            select: {
                                name: true,
                                kelas: true,
                                description: true
                            }
                        })
                        return {
                            message: 'success',
                            data: {
                                MataPelajaran:detail
                            },
                            code: 200
                        }
                    // }
                }
            }
            if (!detail) {
                return {
                    message: 'Not any material relevant',
                    code: 404
                }
            }
            return {
                message: 'success',
                data: detail,
                code: 200
            }
        } catch (error) {
            console.log({
                message: 'Materi Module Detail Materi Error',
                error: error.message,
                code: 500
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    createMateri = async(req) =>{
        try {
            const {idmapel, stasiun, detailMateri, topic, urlaudio} = req
            const create = await db.materi.create({
                data:{
                    idmatapelajaran:parseInt(idmapel),
                    stasiun:stasiun,
                    detailmateri:detailMateri,
                    topic:topic,
                    urlaudio:urlaudio ? urlaudio : null
                },
                select:{
                    id:true
                }
            })
            if(create){
                return{
                    code:201,
                    message:"Success create materi",
                    data:create
                }
            }
        } catch (error) {
            console.log({
                message: 'Materi Module Add Materi Error',
                error: error.message,
                code: 500
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    updateDescription = async(req)=>{
        try {
            const {idmapel, description} = req
            const findMapel = await db.mataPelajaran.findFirst({
                where:{
                    id:parseInt(idmapel)
                },
                select:{
                    description:true
                }
            })
            if(findMapel){
                const update = await db.mataPelajaran.update({
                    where:{
                        id:parseInt(idmapel)
                    },
                    data:{
                        description:description
                    }
                })
                if(update){
                    return {
                        status:true,
                        message: 'Update Description Success',
                        code:201
                    }
                }else{
                    return {
                        status:false,
                        message: 'Update Description Failed',
                        code:400
                    }
                }
            }else{
                return {
                    status:false,
                    message: 'Not Any Mapel Relevant',
                    code:404
                }
            }
        } catch (error) {
            console.log({
                message: 'Materi Module Add Description Error',
                error: error.message,
                code: 500
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    deleteMateri = async(req)=>{
        try {
            const {idmateri} = req
            const findMateri = await db.materi.findFirst({
                where:{id:parseInt(idmateri)}
            })
            if(findMateri){
                const deleteMateri = await db.materi.delete({
                    where:{
                        id:parseInt(idmateri)
                    }
                })
                if(deleteMateri){
                    return {
                        status:true,
                        message: 'Delete Materi Success',
                        code: 200
                    }
                }
            }else{
                return {
                    status:false,
                    message: 'Not any materi that relevant',
                    code: 404
                }
            }
        } catch (error) {
            console.log({
                message: 'Materi Module Delete Materi Error',
                error: error.message,
                code: 500
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
}
const m$materi = new _materi()
export default m$materi