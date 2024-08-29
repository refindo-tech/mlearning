import db from "../helpers/db.js"
class _result {
    getResultSiswa = async (req) => {
        try {
            const { idmapel, idsiswa } = req
            const mapel = await db.mataPelajaran.findUnique({ where: { id: idmapel } })
            const getResultExam = await db.resultExamSiswa.findMany({
                where: { idmapel, idsiswa }
            })
            let total = 0
            getResultExam.forEach(item => {
                total += item.nilai
            })
            let mean = total / getResultExam.length
            const absen = await db.absensi.count({
                where: { idmatapelajaran: idmapel, idsiswa, status: 'SUDAH' }
            })
            const totalPertemuan = await db.materi.count({
                where: { idmatapelajaran: idmapel }
            })
            // Mengambil semua nilai siswa untuk mata pelajaran yang sama
            const allResults = await db.resultExamSiswa.findMany({
                where: { idmapel }
            })
            // Membuat dictionary untuk menyimpan total nilai dan jumlah ujian untuk setiap siswa
            let siswaScores = {}
            allResults.forEach(result => {
                if (!siswaScores[result.idsiswa]) {
                    siswaScores[result.idsiswa] = {
                        totalNilai: 0,
                        jumlahUjian: 0
                    }
                }
                siswaScores[result.idsiswa].totalNilai += result.nilai
                siswaScores[result.idsiswa].jumlahUjian += 1
            })
            // Menghitung rata-rata nilai setiap siswa
            let siswaAverages = Object.keys(siswaScores).map(idsiswa => ({
                idsiswa: parseInt(idsiswa),
                mean: siswaScores[idsiswa].totalNilai / siswaScores[idsiswa].jumlahUjian
            }))
            // Mengurutkan rata-rata nilai dari yang tertinggi ke terendah
            siswaAverages.sort((a, b) => b.mean - a.mean)
            // Mencari peringkat siswa saat ini
            const currentRank = siswaAverages.findIndex(siswa => siswa.idsiswa === idsiswa) + 1
            return {
                status: true,
                message: 'success',
                data: {
                    mapel,
                    exam: getResultExam,
                    mean,
                    absen: `${absen} dari ${totalPertemuan} pertemuan`,
                    rank: currentRank
                },
                code: 200
            }
        } catch (error) {
            console.log({
                status: false,
                message: 'Result Module Get Result Siswa Error',
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
const m$result = new _result()
export default m$result