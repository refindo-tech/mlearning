import db from "../helpers/db"
class _exam {
    createExam = async (req) => {
        try {
            const { idmapel, stasiun, data, topic } = req
            const findMateri = await db.materi.findFirst({
                where: {
                    idmatapelajaran: parseInt(idmapel),
                    stasiun: stasiun
                },
                select: {
                    id: true
                }
            })
            const findExam = await db.exam.findFirst({
                where:{
                    idmateri:parseInt(findMateri.id)
                },
                select:{
                    id:true
                }
            })
            if(!findExam){
                const create = await db.exam.create({
                    data: {
                        idmapel: parseInt(idmapel),
                        stasiun: stasiun,
                        idmateri: findMateri.id,
                        topic: topic
                    },
                    select: {
                        id: true
                    }
                })
                if (create) {
                    for (let i = 0; i < data.length; i++) {
                        await db.examQuestion.create({
                            data: {
                                idexam: create.id,
                                text: data[i].text,
                                urlaudio: data[i].urlaudio ? data[i].urlaudio : null,
                                optionanswer: data[i].optionanswer ? data[i].optionanswer : null,
                                correctAnswer: data[i].correctAnswer ? data[i].correctAnswer : null
                            }
                        })
                    }
                }
                return {
                    status: true,
                    message: 'Create Exam Success',
                    code: 201
                }
            }
            await db.exam.update({
                where:{
                    id:parseInt(findExam.id)
                },
                data:{
                    topic:topic
                }
            })
            for (let i = 0; i < data.length; i++) {
                const findQuestion = await db.examQuestion.findFirst({
                    where:{
                        idexam:findExam.id,
                        text:data[i].text
                    }
                })
                if(!findQuestion){
                    await db.examQuestion.create({
                        data: {
                            idexam: findExam.id,
                            text: data[i].text,
                            urlaudio: data[i].urlaudio ? data[i].urlaudio : null,
                            optionanswer: data[i].optionanswer ? data[i].optionanswer : null,
                            correctAnswer: data[i].correctAnswer ? data[i].correctAnswer : null
                        }
                    })
                }
            }
            return {
                status: true,
                message: 'Create Exam Success',
                code: 201
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
                    topic: true
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
                // await db.authExamSiswa.create({
                //     data: {
                //         idexam, idmapel, idsiswa, stasiun, answer: answer[i]
                //     }
                // })
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
                where: { idmapel: parseInt(idmapel), stasiun },
                select: { id: true }
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
                    idsiswa: parseInt(idsiswa),
                    idmapel: parseInt(idmapel),
                    stasiun: stasiun,
                }
            })
            if (isResult) {
                const editNilai = await db.resultExamSiswa.update({
                    where: { id: isResult.id },
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
            } else {
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
            const { idmapel, stasiun, limit } = req;
            const findExam = await db.exam.findFirst({
                where: {
                    idmapel: parseInt(idmapel),
                    stasiun: stasiun
                },
                select: {
                    id: true
                }
            });
            if (!findExam) {
                return {
                    status: true,
                    message: 'success',
                    data: [],
                    code: 200
                };
            }
            const idExam = findExam.id;
            const listExamAuthSiswa = await db.authExamSiswa.findMany({
                where: { idexam: parseInt(idExam) },
                select: {
                    idsiswa: true
                }
            });

            // Menggunakan Set untuk menghapus duplikasi idsiswa
            let listIdSiswa = listExamAuthSiswa.map((auth) => auth.idsiswa);
            console.log('listExamAuthSiswa:', listExamAuthSiswa);
            console.log('listIdSiswa:', listIdSiswa);
            // Menggunakan findMany untuk mendapatkan banyak profil siswa sekaligus
            const listProfile = await db.profileSiswa.findMany({
                where: {
                    idsiswa: {
                        in: listIdSiswa // Menggunakan operator 'in' untuk mendapatkan profil siswa dengan idsiswa yang ada di listIdSiswa
                    }
                },
                select: {
                    idsiswa: true,
                    name: true,
                    nisn: true,
                    kelas: true
                },
                take: parseInt(limit)
            });

            return {
                status: true,
                message: 'success',
                data: listProfile,
                code: 200
            };
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Modul List Exam Error',
                error: error
            });
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            };
        }
    };
    deleteExam = async (req) => {
        try {
            const { idexam } = req
            const deleteData = await db.exam.delete({
                where: {
                    id: parseInt(idexam)
                }
            })
            if (!deleteData) {
                return {
                    status: false,
                    message: 'Delete Exam Failed',
                    error: 400
                }
            }
            return {
                status: true,
                message: 'Delete Exam Success',
                error: 201
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Exam Modul List Exam Error',
                error: error
            });
            return {
                status: false,
                message: 'Internal Server Error',
                code: 500
            };
        }
    }
}
const m$exam = new _exam()
export default m$exam