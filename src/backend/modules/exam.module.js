import { error } from "console"
import db from "../helpers/db"
class _exam {
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
            const verify = await db.authExamSiswa.findMany({
                where: { idexam: parseInt(idexam), idmapel: parseInt(idmapel), idsiswa: parseInt(idsiswa), stasiun }
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
            const addData = await db.resultExamSiswa.create({
                data:{
                    idmapel:parseInt(idmapel),
                    idsiswa:parseInt(idsiswa),
                    stasiun:stasiun,
                    nilai:result
                }
            })
            if(!addData){
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
}
const m$exam = new _exam()
export default m$exam