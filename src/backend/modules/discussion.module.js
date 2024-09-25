import db from '../helpers/db'
class _discussion{
    detailDiscussion = async(req)=>{
        try {
            const {idmapel, stasiun} = req
            const detail = await db.diskusi.findFirst({
                where:{
                    idmapel:parseInt(idmapel),
                    stasiun:stasiun,
                },
                select:{
                    id:true,
                    question:true,
                    urlaudio:true,
                    urlimage:true,
                    urlvideo:true,
                    topic:true
                }
            })
            if(!detail){
                return{
                    status:false,
                    message:'Topic discussion not found',
                    code:404
                }
            }
            return{
                status:true,
                message:'success',
                code:200,
                data:detail
            }
        } catch (error) {
            console.log({
                message:'Discussion Module Detail Discussion Error',
                error:error.message
            })
            return{
                status:false,
                message:'Internal Server Error',
                code:500
            }
        }
    }
    createDicussion = async(req) =>{
        try {
            const {idmapel, stasiun, question, topic, urlaudio} = req
            const findMateri = await  db.materi.findFirst({
                where:{
                    stasiun:stasiun,
                    idmatapelajaran:parseInt(idmapel)
                },
                select:{
                    id:true
                }
            })
            if(!findMateri){
                return{
                    status:false,
                    message:"Not any materi in this stasiun",
                    code:404
                }
            }
            if(idmapel, stasiun, question, topic){
                const create = await db.diskusi.create({
                    data:{
                        idmapel:parseInt(idmapel),
                        stasiun:stasiun,
                        question:question,
                        urlaudio: urlaudio ? urlaudio:null,
                        idmateri:findMateri.id,
                        topic:topic
                    }
                })
                if(create){
                    return{
                        code:201,
                        message:"Success create discussion",
                    }
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
}
const m$diskusi = new _discussion()
export default m$diskusi