'use client'
import { Image, Input, Button } from '@nextui-org/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getDetailProfileByTeacher, editProfile, editProfileWali, accessGuru } from '@/backend/fetchAPI.js'
import Loading from '@/app/loading'
import Icons from '@/components/Icons'
const ProfileSiswaEdit = () => {
    const path = usePathname()
    const router = useRouter()
    const idsiswa = path.split('/')[2]
    const { AddIcon } = Icons
    const [isLoad, setIsLoad] = useState(true)
    const [submitLoad, setSubmitLoad] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [dataEdit, setDataEdit] = useState(null)
    const [dataEditWali, setDataEditWali] = useState(null)
    const [detailSiswa, setDetailSiswa] = useState(null)
    const [detailWali, setDetailWali] = useState(null)
    useEffect(() => {
        const payload = {
            idsiswa: parseInt(idsiswa)
        }
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/')
            }
            const response = await getDetailProfileByTeacher(payload)
            if (response.status) {
                setIsLoad(false)
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
    }, [router, idsiswa])
    const handleEditData = (name, value) => {
        setDataEdit((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }
    const handleEditDataWali = (name, value) => {
        setDataEditWali((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }
    const handleSubmitEdit = () => {
        const fetchAPI = async () => {
            const formData = new FormData()
            if(selectedFile){
                formData.append('photo', selectedFile)
            }
            formData.append('idsiswa', parseInt(idsiswa))
            formData.append('payload', JSON.stringify(dataEdit))
            if (dataEdit && dataEditWali) {
                const payloadEditProfileWali = {
                    idsiswa: parseInt(idsiswa),
                    payload: dataEditWali
                }
                const response = await editProfile(formData)
                const responseWali = await editProfileWali(payloadEditProfileWali)
                if (response && responseWali) {
                    const newUrl = path.replace(`edit`,'')
                    router.push(newUrl)
                }
            } else if (dataEdit || selectedFile) {
                const response = await editProfile(formData)
                if (response) {
                    const newUrl = path.replace(`edit`,'')
                    router.push(newUrl)
                }
            } else if (dataEditWali) {
                const payloadEditProfileWali = {
                    idsiswa: parseInt(idsiswa),
                    payload: dataEditWali
                }
                const response = await editProfileWali(payloadEditProfileWali)
                if (response) {
                    const newUrl = path.replace(`edit`,'')
                    router.push(newUrl)
                }
            }
        }
        fetchAPI()
    }
    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file)
    }
    if (isLoad) {
        return (<Loading />)
    }
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
                                    {selectedFile ?
                                        (
                                            <Image 
                                                alt='preview'
                                                src={URL.createObjectURL(selectedFile)}
                                                className='h-[80px] w-[80px] rounded-full'
                                            />
                                        ):
                                        (
                                        <div>
                                            <label htmlFor="photo">
                                                <div
                                                    className='h-[80px] w-[80px] rounded-full border-2 border-dashed border-primer-500 flex justify-center items-center'
                                                >
                                                    <AddIcon fill={'#110B63'} />
                                                </div>
                                            </label>
                                            <input
                                                name='photo'
                                                id='photo'
                                                type="file"
                                                accept='.jpg, .png, .jpeg'
                                                className='hidden'
                                                onChange={(e) => handleChangeFile(e)}
                                            />
                                        </div>
                                        )
                                    }
                                    <Input
                                        name='name'
                                        defaultValue={detailSiswa.name ? `${detailSiswa.name}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Ubah nama siswa'
                                        className='max-w-xs'
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>NISN</h3>
                                    <Input
                                        name='nisn'
                                        defaultValue={detailSiswa.nisn ? `${detailSiswa.nisn}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan NISN siswa'
                                        className=''
                                        type='number'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Kelas</h3>
                                    <Input
                                        name='kelas'
                                        defaultValue={detailSiswa.kelas ? `${detailSiswa.kelas}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan kelas siswa'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
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
                                    <Input
                                        name='ttl'
                                        defaultValue={detailSiswa.ttl ? `${detailSiswa.ttl}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan tempat tanggal lahir siswa'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Jenis Kelamin</h3>
                                    <Input
                                        name='gender'
                                        defaultValue={detailSiswa.gender ? `${detailSiswa.gender}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan jenis kelamin siswa'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Agama</h3>
                                    <Input
                                        name='agama'
                                        defaultValue={detailSiswa.agama ? `${detailSiswa.agama}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan agama siswa'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>No. Telepon</h3>
                                    <Input
                                        name='phone'
                                        defaultValue={detailSiswa.phone ? `${detailSiswa.phone}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan nomor telepon siswa'
                                        className=''
                                        type='number'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Anak Ke-</h3>
                                    <Input
                                        name='anakke'
                                        defaultValue={detailSiswa.anakke ? `${detailSiswa.anakke}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan status anak ke- siswa'
                                        className=''
                                        type='number'
                                        onChange={(e) => handleEditData(e.target.name, parseInt(e.target.value))}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Alamat Peserta Didik</h3>
                                    <Input
                                        name='alamat'
                                        defaultValue={detailSiswa.alamat ? `${detailSiswa.alamat}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan alamat siswa'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Sekolah Asal</h3>
                                    <Input
                                        name='sekolah'
                                        defaultValue={detailSiswa.sekolah ? `${detailSiswa.sekolah}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan sekolah asal siswa'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
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
                                    <Input
                                        name='name'
                                        defaultValue={detailWali.name ? `${detailWali.name}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan nama Orang Tua/Wali siswa'
                                        type='text'
                                        onChange={(e) => handleEditDataWali(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Pekerjaan Orang Tua/Wali</h3>
                                    <Input
                                        name='pekerjaan'
                                        defaultValue={detailWali.pekerjaan ? `${detailWali.pekerjaan}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan pekerjaan Orang Tua/Wali siswa'
                                        type='text'
                                        onChange={(e) => handleEditDataWali(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>No. Telepon Orang Tua/Wali</h3>
                                    <Input
                                        name='phone'
                                        defaultValue={detailWali.phone ? `${detailWali.phone}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan no.telepon Orang Tua/Wali siswa'
                                        type='number'
                                        onChange={(e) => handleEditDataWali(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Alamat Orang Tua/Wali</h3>
                                    <Input
                                        name='alamat'
                                        defaultValue={detailWali.alamat ? `${detailWali.alamat}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan alamat Orang Tua/Wali siswa'
                                        type='text'
                                        onChange={(e) => handleEditDataWali(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <ActionGroup handleSubmitEdit={handleSubmitEdit} />
            </div>
            <Footer />
        </div>
    )
}
export default ProfileSiswaEdit

const ActionGroup = ({ handleSubmitEdit }) => {
    const router = useRouter()
    const url = usePathname()
    const [isLoad, setIsLoad] = useState(false)
    const handleBack = () => {
        const newUrl = url.replace('/edit', '')
        router.push(newUrl)
    }
    return (
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
                    isDisabled={isLoad ? true : false}
                    className='w-[260px] bg-primer-500 text-white'
                    onPress={() => {
                        setIsLoad(true)
                        handleSubmitEdit()
                    }}
                >
                    {isLoad ?
                        (<div className='loader'></div>) :
                        (<span>Simpan</span>)
                    }
                </Button>
            </div>
        </div>
    )
}