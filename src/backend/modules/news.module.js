import db from '../helpers/db.js'
class _news {
    addNews = async(req)=>{
        try {
            const {text} = req
            const createNews = await db.news.create({
                data:{text}
            })
            if(!createNews){
                return{
                    status:false,
                    message: 'Bad State',
                    code:400
                }
            }
            return{
                status:true,
                message: 'create news success',
                code:201
            }
        } catch (error) {
            console.log({
                message:'Add News Module News Error',
                error:error,
            })
            return{
                status:false,
                message: 'Internal Server Error',
                code:500
            }
        }
    }
    listNews = async()=>{
        try {
            const list = await db.news.findMany()
            if(!list){
                return{
                    status:false,
                    message: 'Bad State',
                    code:400
                }
            }
            return{
                status:true,
                message: 'Get List news success',
                data:list,
                code:200
            }
        } catch (error) {
            console.log({
                message:'Add News Module News Error',
                error:error,
            })
            return{
                status:false,
                message: 'Internal Server Error',
                code:500
            }
        }
    }
    deleteNews = async(req)=>{
        try {
            const {idNews} = req
            const deleteNews = await db.news.delete({
                where:{
                    id:parseInt(idNews)
                }
            })
            if(!deleteNews){
                return{
                    status:false,
                    message: 'Bad State',
                    code:400
                }
            }
            return{
                status:true,
                message: 'Delete news success',
                code:201
            }
        } catch (error) {
            console.log({
                message:'Delete News Module News Error',
                error:error,
            })
            return{
                status:false,
                message: 'Internal Server Error',
                code:500
            }
        }
    }
}
const m$news = new _news()
export default m$news