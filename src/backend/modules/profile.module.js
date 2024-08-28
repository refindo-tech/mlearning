import db from '../helpers/db.js'
class _profile{
    detailProfile = async(req)=>{
        try {
            const {idsiswa} = req
            const detail = await db.profileSiswa.findFirst({
                where:{
                    idsiswa:parseInt(idsiswa)
                }
            })
            if(detail){
                const detailWali = await db.profileWali.findFirst({
                    where:{
                        idsiswa:parseInt(idsiswa)
                    }
                })
                return{
                    status:true,
                    message:'success',
                    data:{
                        siswa:detail,
                        wali:detailWali
                    },
                    code:200
                }
            }
        } catch (error) {
            console.log({
                status:false,
                message:'Profile Module Detail Profile Error',
                error:error
            })
            return{
                status:false,
                message:'Internal Server Error',
                code:500
            }
        }
    }
}
const m$profile = new _profile()
export default m$profile