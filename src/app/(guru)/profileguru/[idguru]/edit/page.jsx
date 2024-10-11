'use client'
import { Image, Input, Button } from '@nextui-org/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getDetailProfileGuru, editProfileGuru, accessGuru} from '@/backend/fetchAPI.js'
import Loading from '@/app/loading'
import Icons from '@/components/Icons'
const ProfileGuruEdit = () => {
    const path = usePathname()
    const router = useRouter()
    const idguru = path.split('/')[2]
    const {AddIcon} = Icons
    const [selectedFile, setSelectedFile] = useState(null)
    const [isLoad, setIsLoad] = useState(true)
    const [submitLoad, setSubmitLoad] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)
    const [detailGuru, setDetailGuru] = useState(null)
    useEffect(() => {
        const payload = {
            idguru: parseInt(idguru)
        }
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/')
            }
            const response = await getDetailProfileGuru(payload)
            if (response.status) {
                setIsLoad(false)
                setDetailGuru(response.data)
            } else {
                router.push('/onboarding')
            }
        }
        fetchAPI()
    }, [router, idguru])
    const handleEditData = (name, value) => {
        setDataEdit((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }
    const handleSubmitEdit = () => {
        const formData = new FormData()
        if(selectedFile){
            formData.append('photo', selectedFile)
        }
        formData.append('idguru', parseInt(idguru))
        formData.append('payload',JSON.stringify(dataEdit))
        const fetchAPI = async () => {
            if(dataEdit || selectedFile){
                const response = await editProfileGuru(formData)
                if(response){
                    const newUrl = path.replace('edit','')
                    router.push(newUrl)
                }
            }
        }
        fetchAPI()
    }
    const handleChangeFile = (e)=>{
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
                    {detailGuru &&
                        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            <div className='h-[300px] flex flex-row rounded-lg border-2 border-gray-200'>
                                <div className='w-[90%] mx-auto flex items-center justify-center gap-10'>
                                    {/* <div className='h-[100px] w-[100px] flex items-center justify-center rounded-full bg-accent-orange'>
                                        <Image
                                            alt="avatar"
                                            src="/assets/image/avatar.png"
                                            className="block h-[88px] w-[88px]"
                                        />
                                    </div> */}
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
                                        defaultValue={detailGuru.name ? `${detailGuru.name}` : null}
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
                                    <h3 className='text-lg font-bold'>NUPTK</h3>
                                    <Input
                                        name='nuptk'
                                        defaultValue={detailGuru.nuptk ? `${detailGuru.nuptk}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan NUPTK anda'
                                        className=''
                                        type='number'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Tempat, Tanggal Lahir</h3>
                                    <Input
                                        name='ttl'
                                        defaultValue={detailGuru.ttl ? `${detailGuru.ttl}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan Tempat Tanggal Lahir'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Mulai Mengajar</h3>
                                    <Input
                                        name='start'
                                        defaultValue={detailGuru.start ? `${detailGuru.start}` : null}
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan tanggal mulai mengajar anda'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleEditData(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>}
                </div>
                <ActionGroup handleSubmitEdit={handleSubmitEdit} />
            </div>
            <Footer />
        </div>
    )
}
export default ProfileGuruEdit

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
                    className='w-[100px] lg:w-[260px] text-primer-500'
                    onPress={handleBack}
                >
                    <span>Kembali</span>
                </Button>
                <Button
                    radius='sm'
                    isDisabled={isLoad ? true : false}
                    className='w-[100px] lg:w-[260px] bg-primer-500 text-white'
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