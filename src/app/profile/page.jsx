import { Image } from '@nextui-org/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
const Profile = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='relative w-full min-h-screen flex flex-col gap-5'>
                <Background />
                <div className='w-[90%] mx-auto flex flex-col gap-4 pt-10'>
                    <h1 className='text-xl font-bold'>Tentang Akun</h1>
                    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div className='h-[300px] flex flex-row items-center pl-5 lg:pl-10 gap-10 rounded-lg border-2 border-gray-200'>
                            <div className='h-[100px] w-[100px] flex items-center justify-center rounded-full bg-accent-orange'>
                                <Image
                                    alt="avatar"
                                    src="/assets/image/avatar.png"
                                    className="block h-[88px] w-[88px]"
                                />
                            </div>
                            <h3 className='text-2xl font-bold'>Michele Jordan</h3>
                        </div>
                        <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>NISN</h3>
                                <p className='text-lg font-bold text-accent-orange'>0000456745674567</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Kelas</h3>
                                <p className='text-lg font-bold text-accent-orange'>10 A</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Nama</h3>
                                <p className='text-lg font-bold text-accent-orange'>Zaky Maulana Al Bajili</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-xl font-bold'>Detail Informasi</h1>
                        <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Tempat, Tanggal Lahir</h3>
                                <p className='text-lg font-bold text-accent-orange'>Jakarta, xx-xx-xxxx</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Jenis Kelamin</h3>
                                <p className='text-lg font-bold text-accent-orange'>Perempuan</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Agama</h3>
                                <p className='text-lg font-bold text-accent-orange'>Islam</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>No. Telepon</h3>
                                <p className='text-lg font-bold text-accent-orange'>xxxxxxxxxxx</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Anak Ke-</h3>
                                <p className='text-lg font-bold text-accent-orange'>2</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Alamat Peserta Didik</h3>
                                <p className='text-lg font-bold text-accent-orange'>Jl. Suko Mulyo No. 11</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Sekolah Asal</h3>
                                <p className='text-lg font-bold text-accent-orange'>SMAN 3 KOTA SERANG</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 pb-10'>
                        <h1 className='text-xl font-bold'>Informasi Lainnya</h1>
                        <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Orang Tua/Wali</h3>
                                <p className='text-lg font-bold text-accent-orange'>Joko Kusumo</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Pekerjaan Orang Tua/Wali</h3>
                                <p className='text-lg font-bold text-accent-orange'>Pegawai Swasta</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>No. Telepon Orang Tua/Wali</h3>
                                <p className='text-lg font-bold text-accent-orange'>xxxxxxxxxxx</p>
                            </div>
                            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                <h3 className='text-lg font-bold'>Alamat Orang Tua/Wali</h3>
                                <p className='text-lg font-bold text-accent-orange'>Jl. Suko Mulyo No.11</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Profile