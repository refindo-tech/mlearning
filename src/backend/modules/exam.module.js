import { error } from "console"
import db from "../helpers/db"
import { select } from "@nextui-org/react"
class _exam {
    createExam = async(req) =>{
        try {
            const {idmapel, stasiun, data} = req
            const create = await db.exam.create({
                data:{
                    idmapel:parseInt(idmapel),
                    stasiun:stasiun,
                },
                select:{
                    id:true
                }
            })
            if(create){
                for(const i =0; i<data.length; i++){
                    await db.examQuestion.create({
                        data:{
                            idexam:create.id,
                            text:data[i].text,
                            urlaudio:data[i].urlaudio ? data[i].urlaudio : null,
                            optionanswer:data[i].optionanswer ? data[i].optionanswer : null,
                            correctAnswer:data[i].correctAnswer ? data[i].correctAnswer : null
                        }
                    })
                }
            }

            // const createQuestion = await db.examQuestion.createMany({
            //     data:[]
            // })
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Model Create Exam Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    listQuestionExam = async (req) => {
        try {
            const { idmapel, stasiun } = req
            const exam = await db.exam.findFirst({
                where: {
                    idmapel: parseInt(idmapel),
                    stasiun: stasiun
                },
                select: {
                    id: true,
                    idmapel: true,
                    stasiun: true,
                    MataPelajaran: {
                        select: {
                            Materi: {
                                where: {
                                    stasiun: stasiun
                                },
                                select: {
                                    topic: true
                                }
                            }
                        }
                    }
                }
            })
            if (!exam) {
                return {
                    status: false,
                    message: 'Not Any Exam Relevant',
                    error: exam,
                    code: 404
                }
            }
            const listQuestion = await db.examQuestion.findMany({
                where: {
                    idexam: exam.id
                }
            })
            console.log(listQuestion)
            return {
                status: true,
                message: 'success',
                code: 200,
                data: {
                    other: exam,
                    listQuestion
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Model List Question Exam',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    answerExam = async (req) => {
        try {
            const { idexam, idmapel, idsiswa, stasiun, answer } = req
            for (let i = 0; i < answer.length; i++) {
                const addData = await db.authExamSiswa.create({
                    data: {
                        idexam, idmapel, idsiswa, stasiun, answer: answer[i]
                    }
                })
                if (addData) console.log(addData)
            }
            return {
                status: true,
                message: 'success',
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Modul Answer Exam Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    listExamAnswer = async (req) => {
        try {
            const { idexam, idmapel, idsiswa, stasiun } = req
            const findExam = await db.exam.findFirst({
                where:{idmapel:parseInt(idmapel), stasiun},
                select:{id:true}
            })
            const idExam = findExam.id
            const verify = await db.authExamSiswa.findMany({
                where: { idexam: parseInt(idExam), idmapel: parseInt(idmapel), idsiswa: parseInt(idsiswa), stasiun }
            })
            if (verify) {
                return {
                    status: true,
                    message: 'success',
                    data: verify,
                    code: 200
                }
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Modul Answer Exam Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    correctionExam = async (req) => {
        try {
            let total = 0
            const { idmapel, idsiswa, stasiun, nilai } = req
            for (let i = 0; i < nilai.length; i++) {
                total = total + nilai[i]
            }
            const result = total / nilai.length
            const isResult = await db.resultExamSiswa.findFirst({
                where: {
                    idsiswa:parseInt(idsiswa),
                    idmapel: parseInt(idmapel),
                    stasiun: stasiun,
                }
            })
            if(isResult){
                const editNilai = await db.resultExamSiswa.update({
                    where:{id:isResult.id},
                    data: {
                        idmapel: parseInt(idmapel),
                        stasiun: stasiun,
                        nilai: Math.round(result)
                    }
                })
                if (!editNilai) {
                    return {
                        status: false,
                        message: 'Edit nilai failed',
                        code: 400
                    }
                }
                return {
                    status: true,
                    message: 'success',
                    code: 200
                }
            }else{
                const addData = await db.resultExamSiswa.create({
                    data: {
                        idmapel: parseInt(idmapel),
                        idsiswa: parseInt(idsiswa),
                        stasiun: stasiun,
                        nilai: Math.round(result)
                    }
                })
                if (!addData) {
                    return {
                        status: false,
                        message: 'Add data failed',
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
                message: 'Exam Modul Answer Exam Error',
                error: error
            })
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            }
        }
    }
    listExam = async (req) => {
        try {
            const { idmapel, stasiun } = req
            const findExam = await db.exam.findFirst({
                where: {
                    idmapel: parseInt(idmapel),
                    stasiun: stasiun
                },
                select: {
                    id: true
                }
            })
            if(!findExam){
                return {
                    status: true,
                    message: 'success',
                    data: [],
                    code: 200
                }
            }
            const idExam = findExam.id
            const listExamAuthSiswa = await db.authExamSiswa.findMany({
                where: { idexam: parseInt(idExam) },
                select: {
                    idsiswa: true
                },
                take: 10
            })
            const listIdSiswa = listExamAuthSiswa.map((auth) => auth.idsiswa)
            const detailSiswa = await db.profileSiswa.findMany({
                where: {
                    idsiswa: {
                        in: listIdSiswa
                    }
                },
                select: {
                    idsiswa: true,
                    name: true,
                    nisn: true,
                    kelas: true
                }
            })
            return {
                status: true,
                message: 'success',
                data: detailSiswa,
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Modul List Exam Error',
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
const m$exam = new _exam()
export default m$exam