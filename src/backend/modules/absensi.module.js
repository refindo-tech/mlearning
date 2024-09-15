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
    addAbsen = async(req)=>{
        try {
            const {idmapel, stasiun, idsiswa} = req
            const profile = await db.profileSiswa.findFirst({
                where:{
                    idsiswa:parseInt(idsiswa)
                }
            })
            if(profile){
                await db.absensi.create({
                    data:{
                        idmatapelajaran:parseInt(idmapel),
                        idsiswa:parseInt(idsiswa),
                        name:profile.name?profile.name:null,
                        nisn:profile.nisn?profile.nisn:null,
                        kelas:profile.kelas?profile.kelas:null,
                        stasiun:decodeURIComponent(stasiun),
                        status:'SUDAH',
                        date: new Date()
                    }
                })
                return{
                    status:true,
                    message:'absen success',
                    code:200
                }
            }
        } catch (error) {
            console.log({
                status:false,
                message:'Absensi Modul Add Absen Error',
                error:error
            })
            return{
                status:false,
                message:'Internal Server Error',
                code:500
            }
        }
    }
    getAbsensiForTeacher = async(req)=>{
        try {
            const {idmapel, stasiun} = req
            const list = await db.absensi.findMany({
                where:{
                    idmatapelajaran:parseInt(idmapel),
                    stasiun
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
                message:'Absensi Modul Get Absensi By Stasiun Error',
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