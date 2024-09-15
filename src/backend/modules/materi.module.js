import db from '../helpers/db'
class _materi {
    listStasiun = async(req)=>{
        try {
            const {idmatapelajaran} = req
            const list = await db.materi.findMany({
                where:{
                    idmatapelajaran: parseInt(idmatapelajaran)
                }
            })
            console.log(list)
            return {
                message:'success',
                data:list,
                code:200
            }
        } catch (error) {
            console.log({
                message:'Materi Module List Stasiun Error',
                error:error.message,
                code:500
            })
            return {
                message:'Internal Server Error',
                code:500
            }
        }
    }
    detailMateri = async(req)=>{
        try {
            const {headers ,idmapel, stasiun} = req
            let detail
            if(idmapel){
                if(stasiun){
                    detail = await db.materi.findFirst({
                        where:{
                            idmatapelajaran: parseInt(idmapel),
                            stasiun:stasiun
                        },
                        include:{
                            MataPelajaran:{
                                select:{
                                    name:true,
                                    kelas:true,
                                    description:true
                                }
                            }
                        }
                    })
                }else{
                    detail = await db.materi.findFirst({
                        where:{
                            idmatapelajaran: parseInt(idmapel),
                        },
                        include:{
                            MataPelajaran:{
                                select:{
                                    name:true,
                                    kelas:true,
                                    description:true
                                }
                            }
                        }
                    })
                }
            }
            if(!detail){
                return{
                    message:'Not any material relevant',
                    code:404
                }
            }
            return {
                message:'success',
                data:detail,
                code:200
            }
        } catch (error) {
            console.log({
                message:'Materi Module Detail Materi Error',
                error:error.message,
                code:500
            })
            return {
                message:'Internal Server Error',
                code:500
            }
        }
    }
}
const m$materi = new _materi()
export default m$materi