import db from "../helpers/db.js"
class _absensi {
    getAbsensiByIdSiswa = async(req)=>{
        try {
            const {idmapel, idsiswa} = req
            const list = await db.absensi.findMany({
                where:{
                    idmatapelajaran:parseInt(idmapel),
                    idsiswa:parseInt(idsiswa)
                }
            })
            return{
                status:true,
                message:'success',
                data:list,
                code:200
            }
        } catch (error) {
            console.log({
                status:false,
                message:'Absensi Modul Get Absensi By Id Siswa Error',
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
const m$absensi = new _absensi()
export default m$absensi