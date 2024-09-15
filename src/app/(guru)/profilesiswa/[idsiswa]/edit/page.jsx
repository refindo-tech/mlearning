'use client'
import { Image, Input, Button } from '@nextui-org/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getDetailProfileByTeacher } from '@/backend/fetchAPI.js'
const ProfileSiswaEdit = () => {
    const router = useRouter()
    const [detailSiswa, setDetailSiswa] = useState(null)
    const [detailWali, setDetailWali] = useState(null)
    useEffect(() => {
        const payload = {
            idsiswa: 15
        }
        const fetchAPI = async () => {
            const response = await getDetailProfileByTeacher(payload)
            if (response.status) {
                console.log(response)
                if (response.data.siswa) {
                    setDetailSiswa(response.data.siswa)
                }
                if (response.data.wali) {
                    setDetailWali(response.data.wali)
                }
            } else {
                router.push('/onboarding')
            }
        }
        fetchAPI()
    }, [router])
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='relative w-full min-h-screen flex flex-col gap-5'>
                <Background />
                <div className='w-[90%] mx-auto flex flex-col gap-4 pt-10'>
                    <h1 className='text-xl font-bold'>Tentang Akun</h1>
                    {detailSiswa &&
                        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            <div className='h-[300px] flex flex-row rounded-lg border-2 border-gray-200'>
                                <div className='w-[90%] mx-auto flex items-center justify-center gap-10'>
                                    <div className='h-[100px] w-[100px] flex items-center justify-center rounded-full bg-accent-orange'>
                                        <Image
                                            alt="avatar"
                                            src="/assets/image/avatar.png"
                                            className="block h-[88px] w-[88px]"
                                        />
                                    </div>
                                    {detailSiswa.name ? (
                                        <Input
                                            defaultValue={`${detailSiswa.name}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Ubah nama siswa'
                                            className='max-w-xs'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Ubah nama siswa'
                                            className='max-w-xs'
                                            type='text'
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>NISN</h3>
                                    {detailSiswa.nisn ? (
                                        <Input
                                            defaultValue={`${detailSiswa.nisn}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan NISN siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan NISN siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Kelas</h3>
                                    {detailSiswa.kelas ? (
                                        <Input
                                            defaultValue={`${detailSiswa.kelas}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan kelas siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan kelas siswa'
                                            type='text'
                                        />
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
                                    {/* {detailSiswa.tempatlahir && detailSiswa.tanggallahir ? (
                                        <p className='text-lg font-bold text-accent-orange'>{`${detailSiswa.tempatlahir}, ${detailSiswa.tanggallahir}`}</p>
                                    ) : (
                                        <p className='text-lg font-bold text-accent-orange'>-</p>
                                    )} */}
                                    {detailSiswa.tempatlahir && detailSiswa.tanggallahir ? (
                                        <Input
                                            defaultValue={`${detailSiswa.tempatlahir},${detailSiswa.tanggallahir}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan tempat dan tanggal lahir siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan tempat dan tanggal lahir siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Jenis Kelamin</h3>
                                    {detailSiswa.gender ? (
                                        <Input
                                            defaultValue={`${detailSiswa.gender}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan jenis kelamin siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan jenis kelamin siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Agama</h3>
                                    {detailSiswa.agama ? (
                                        <Input
                                            defaultValue={`${detailSiswa.agama}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan agama siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan agama siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>No. Telepon</h3>
                                    {detailSiswa.phone ? (
                                        <Input
                                            defaultValue={`${detailSiswa.phone}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan nomor telepon siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan nomor telepon siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Anak Ke-</h3>
                                    {detailSiswa.anakke ? (
                                        <Input
                                            defaultValue={`${detailSiswa.anakke}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan status anak ke- siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan status anak ke- siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Alamat Peserta Didik</h3>
                                    {detailSiswa.alamat ? (
                                        <Input
                                            defaultValue={`${detailSiswa.alamat}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan alamat siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan alamat siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Sekolah Asal</h3>
                                    {detailSiswa.sekolah ? (
                                        <Input
                                            defaultValue={`${detailSiswa.sekolah}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan sekolah asal siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan sekolah asal siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex flex-col gap-4 pb-10'>
                        <h1 className='text-xl font-bold'>Informasi Lainnya</h1>
                        {detailWali &&
                            <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Orang Tua/Wali</h3>
                                    {detailWali.name ? (
                                        <Input
                                            defaultValue={`${detailWali.name}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan nama Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan nama Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Pekerjaan Orang Tua/Wali</h3>
                                    {detailWali.pekerjaan ? (
                                        <Input
                                            defaultValue={`${detailWali.pekerjaan}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan pekerjaan Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan pekerjaan Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>No. Telepon Orang Tua/Wali</h3>
                                    {detailWali.phone ? (
                                        <Input
                                            defaultValue={`${detailWali.phone}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan no.telepon Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan no.telepon Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Alamat Orang Tua/Wali</h3>
                                    {detailWali.alamat ? (
                                        <Input
                                            defaultValue={`${detailWali.alamat}`}
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan alamat Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    ) : (
                                        <Input
                                            variant='bordered'
                                            size='lg'
                                            placeholder='Masukkan alamat Orang Tua/Wali siswa'
                                            type='text'
                                        />
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <ActionGroup/>
            </div>
            <Footer />
        </div>
    )
}
export default ProfileSiswaEdit

const ActionGroup = ()=>{
    const router = useRouter()
    const url = usePathname()
    const handleBack = () =>{
        const newUrl = url.replace('/edit','')
        router.push(newUrl)
    }
    const handleSave = () =>{
        const newUrl = url.replace('/edit','')
        router.push(newUrl)
    }
    return(
        <div className='w-[90%] mx-auto flex justify-end z-10 mb-10'>
            <div className='flex gap-4'>
                <Button
                    radius='sm'
                    variant='light'
                    className='w-[260px] text-primer-500'
                    onPress={handleBack}
                >
                    <span>Kembali</span>
                </Button>
                <Button
                    radius='sm'
                    className='w-[260px] bg-primer-500 text-white'
                    onPress={handleSave}
                >
                    <span>Simpan</span>
                </Button>
            </div>
        </div>
    )
}