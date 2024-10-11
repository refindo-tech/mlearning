import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className="h-[50vh] w-full flex items-center bg-[url('/assets/image/heroonboarding.png')] bg-cover bg-no-repeat bg-center">
            </div>
            <div className="h-[80px] lg:h-[100px] flex items-center text-center justify-center border-b-2 border-gray-200">
                <h3 className="font-bold text-2xl lg:text-[32px]">Tentang M-Learning</h3>
            </div>
            <div className="relative min-h-screen">
                <Background />
                <div className="w-full z-10">
                    <div className="container mx-auto py-10 px-5 flex flex-col gap-y-5 text-justify">
                        <p className="indent-8">
                            M-Learning merupakan platform inovatif yang dirancang untuk mendukung fleksibilitas dalam proses pembelajaran di SMAN 3 Kota Serang. Sebagai Learning Management System (LMS), aplikasi ini memfasilitasi siswa untuk tetap terhubung dengan materi pelajaran, meskipun tidak dapat hadir secara fisik di kelas. M-Learning menghadirkan pendidikan yang lebih inklusif dengan memanfaatkan teknologi digital untuk memenuhi kebutuhan belajar di era modern.
                        </p>
                        <p className="indent-8">
                            Platform ini mengadopsi model blended learning, yang menggabungkan metode pembelajaran tatap muka dengan pembelajaran daring. Model ini memungkinkan siswa untuk belajar secara dinamis, memanfaatkan kombinasi pertemuan langsung dan pembelajaran melalui platform digital. Guru dapat menyampaikan materi, mewadahi diskusi, hingga memberikan tugas dengan cara yang interaktif. Siswa memiliki akses ke seluruh kebutuhan pembelajaran secara fleksibel, baik dari segi waktu maupun tempat.
                        </p>
                        <p className="indent-8">
                            M-Learning hadir sebagai solusi untuk mengatasi keterbatasan yang sering dihadapi dalam pembelajaran tatap muka. Ketika kondisi seperti jarak, waktu, atau situasi lainnya menghalangi kehadiran di kelas, M-Learning tetap memastikan bahwa siswa dapat mengikuti perkembangan materi, menyelesaikan tugas, dan berpartisipasi dalam kegiatan belajar mengajar melalui ruang belajar digital.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AboutPage