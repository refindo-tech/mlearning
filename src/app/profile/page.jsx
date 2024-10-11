'use client'
import { Image } from '@nextui-org/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getDetailProfile, getProfileGuruNavbar } from '@/backend/fetchAPI.js'
import Loading from '../loading'
const Profile = () => {
    const router = useRouter()
    const [detailSiswa, setDetailSiswa] = useState(null)
    const [detailWali, setDetailWali] = useState(null)
    const [detailGuru, setDetailGuru] = useState(null)
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getDetailProfile()
            if (response.status) {
                console.log(response)
                if (response.data.siswa) {
                    setDetailSiswa(response.data.siswa)
                }
                if (response.data.wali) {
                    setDetailWali(response.data.wali)
                }
            }
            const responseGuru = await getProfileGuruNavbar()
            if (responseGuru) {
                setDetailGuru(responseGuru.data)
            }
        }
        fetchAPI()
    }, [router])
    if (!detailGuru && !detailSiswa) {
        return (<Loading />)
    }
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='relative w-full min-h-screen flex flex-col gap-5'>
                <Background />
                {detailSiswa && <>
                    <div className='w-[90%] mx-auto flex flex-col gap-4 pt-10'>
                        <h1 className='text-xl font-bold'>Tentang Akun</h1>
                        {detailSiswa &&
                            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                <div className='h-[300px] flex flex-row items-center pl-5 lg:pl-10 gap-10 rounded-lg border-2 border-gray-200'>
                                    {detailSiswa.urlimage ?
                                        (
                                            <Image
                                                alt="avatar"
                                                src={`${detailSiswa.urlimage}`}
                                                className={'block h-[100px] w-[100px] rounded-full'}
                                            />
                                        ) :
                                        (
                                            <div
                                                className='h-[100px] w-[100px] flex items-center justify-center rounded-full bg-accent-orange'
                                            >
                                                <Image
                                                    alt="avatar"
                                                    src='/assets/image/avatar.png'
                                                    className={'block h-[88px] w-[88px]'}
                                                />
                                            </div>
                                        )
                                    }
                                    {detailSiswa.name ? (
                                        <h3 className='text-2xl font-bold'>{detailSiswa.name}</h3>
                                    ) : (
                                        <h3 className='text-2xl font-bold'>-</h3>
                                    )}
                                </div>
                                <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>NISN</h3>
                                        {detailSiswa.nisn ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.nisn}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Kelas</h3>
                                        {detailSiswa.kelas ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.kelas}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className='w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-xl font-bold'>Detail Informasi</h1>
                            {detailSiswa &&
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Tempat, Tanggal Lahir</h3>
                                        {detailSiswa.tempatlahir && detailSiswa.tanggallahir ? (
                                            <p className='text-lg font-bold text-accent-orange'>{`${detailSiswa.tempatlahir}, ${detailSiswa.tanggallahir}`}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Jenis Kelamin</h3>
                                        {detailSiswa.gender ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.gender}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Agama</h3>
                                        {detailSiswa.agama ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.agama}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>No. Telepon</h3>
                                        {detailSiswa.phone ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.phone}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Anak Ke-</h3>
                                        {detailSiswa.anakke ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.anakke}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Alamat Peserta Didik</h3>
                                        {detailSiswa.alamat ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.alamat}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Sekolah Asal</h3>
                                        {detailSiswa.sekolah ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailSiswa.sekolah}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                        {detailWali &&
                            <div className='flex flex-col gap-4 pb-10'>
                                <h1 className='text-xl font-bold'>Informasi Lainnya</h1>
                                (<div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Orang Tua/Wali</h3>
                                        {detailWali.name ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailWali.name}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Pekerjaan Orang Tua/Wali</h3>
                                        {detailWali.pekerjaan ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailWali.pekerjaan}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>No. Telepon Orang Tua/Wali</h3>
                                        {detailWali.phone ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailWali.phone}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Alamat Orang Tua/Wali</h3>
                                        {detailWali.phone ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailWali.phone}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                </div>) : (
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>-</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Pekerjaan Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>-</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>No. Telepon Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>-</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Alamat Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>-</p>
                                    </div>
                                </div>
                                )
                            </div>}
                    </div>
                </>}
                {detailGuru &&
                    <div className='w-[90%] mx-auto flex flex-col gap-4 pt-10'>
                        <h1 className='text-xl font-bold'>Tentang Akun</h1>
                        {detailGuru &&
                            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                <div className='h-[300px] flex flex-row items-center pl-5 lg:pl-10 gap-10 rounded-lg border-2 border-gray-200'>
                                    {detailGuru.urlimage ?
                                        (
                                            <Image
                                                alt="avatar"
                                                src={`${detailGuru.urlimage}`}
                                                className={'block h-[100px] w-[100px] rounded-full'}
                                            />
                                        ) :
                                        (
                                            <div
                                                className='h-[100px] w-[100px] flex items-center justify-center rounded-full bg-accent-orange'
                                            >
                                                <Image
                                                    alt="avatar"
                                                    src='/assets/image/avatar.png'
                                                    className={'block h-[88px] w-[88px]'}
                                                />
                                            </div>
                                        )
                                    }
                                    {detailGuru.name ? (
                                        <h3 className='text-2xl font-bold'>{detailGuru.name}</h3>
                                    ) : (
                                        <h3 className='text-2xl font-bold'>-</h3>
                                    )}
                                </div>
                                <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>NUPTK</h3>
                                        {detailGuru.nuptk ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailGuru.nuptk}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Tempat, Tanggal Lahir</h3>
                                        {detailGuru.ttl ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailGuru.ttl}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Mulai Mengajar</h3>
                                        {detailGuru.start ? (
                                            <p className='text-lg font-bold text-accent-orange'>{detailGuru.start}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-orange'>-</p>
                                        )}
                                    </div>
                                </div>
                            </div>}
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}
export default Profile