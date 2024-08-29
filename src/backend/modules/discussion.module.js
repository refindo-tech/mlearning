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
                    question:true,
                    urlaudio:true,
                    urlimage:true,
                    urlvideo:true,
                    Materi:true
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
}
const m$diskusi = new _discussion()
export default m$diskusi