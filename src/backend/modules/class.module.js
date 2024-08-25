import db from "../helpers/db"
class _kelas {
    listClass = async(req)=>{
        try {
            const queryParams = new URLSearchParams(req);
            const kelas = queryParams.get('kelas')
            const name = queryParams.get('name')
            let getClass
            if(kelas){
                getClass = await db.mataPelajaran.findMany({
                    where:{
                        kelas:kelas,
                    }
                })
            }
            if(name){
                getClass = await db.mataPelajaran.findMany({
                    where:{
                        name:{
                            contains:name
                        }
                    }
                })
            }
            return {
                message: 'success',
                data:getClass,
                code: 200
            }
        } catch (error) {
            console.log(error)
            console.log({
                message:'Class Module List Class Error',
                error:error.message
            })
            return {
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    // searchClass = async (req)=>{
    //     try {
    //         const {mapel}=req
    //         const data = await db.mataPelajaran
    //     } catch (error) {
    //         console.log(error)
    //         console.log({
    //             message:'Class Module List Class Error',
    //             error:error.message
    //         })
    //         return {
    //             message: 'Internal Server Error',
    //             code: 500
    //         }
    //     }
    // }
}
const m$kelas = new _kelas()
export default m$kelas