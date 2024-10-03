'use client'
import { Image, Input, Button } from '@nextui-org/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getDetailProfileGuru, editProfileGuru, addGuru } from '@/backend/fetchAPI.js'
import Loading from '@/app/loading'
import Icons from '../Icons'
const ModalAddGuru = ({ active, handleModal }) => {
    const path = usePathname()
    const router = useRouter()
    const idguru = path.split('/')[2]
    const { AddIcon } = Icons
    const [selectedFile, setSelectedFile] = useState(null)
    const [isLoad, setIsLoad] = useState(true)
    const [submitLoad, setSubmitLoad] = useState(false)
    const [dataEdit, setDataEdit] = useState(null)
    const [payloadCredential, setPayloadCredential] = useState(null)
    const [profileGuru, setProfileGuru] = useState(null)
    const [detailGuru, setDetailGuru] = useState(null)
    const handlePayloadCredential = (name, value) => {
        setPayloadCredential((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleDataProfileGuru = (name, value) => {
        setProfileGuru((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }
    const handleSubmitAddGuru = () => {
        const formData = new FormData()
        if(selectedFile){
            formData.append('photo', selectedFile)
        }
        formData.append('payload', JSON.stringify(payloadCredential))
        formData.append('ProfileGuru', JSON.stringify(profileGuru))
        // let payload = {
        //     payload: payloadCredential,
        //     ProfileGuru: profileGuru
        // }
        const fetchAPI = async () => {
            if (payloadCredential && profileGuru) {
                const response = await addGuru(formData)
                if (response) {
                    window.location.reload()
                }
            }
        }
        fetchAPI()
    }
    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file)
    }
    return (
        <>
            {active &&
                <div className='relative w-full min-h-screen flex flex-col gap-5'>
                    <Background />
                    <div className='w-[90%] mx-auto flex flex-col gap-4 pt-10'>
                        <h1 className='text-xl font-bold'>Tambah Guru</h1>
                        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            <div className='w-full justify-center items-center rounded-lg border-2 border-gray-200'>
                                <div className='w-[90%] mx-auto h-[300px] flex flex-row items-center justify-between gap-10'>
                                    {selectedFile ?
                                        (
                                            <Image
                                                alt='preview'
                                                src={URL.createObjectURL(selectedFile)}
                                                className='h-[80px] w-[100px] rounded-full'
                                            />
                                        ) :
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
                                    <div className='flex flex-col justify-center gap-4 w-full '>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            <h3 className='text-lg font-bold'>Nama</h3>
                                            <Input
                                                name='name'
                                                variant='bordered'
                                                size='lg'
                                                placeholder='Masukkan nama'
                                                className=''
                                                type='text'
                                                onChange={(e) => handleDataProfileGuru(e.target.name, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            <h3 className='text-lg font-bold'>Email</h3>
                                            <Input
                                                name='email'
                                                variant='bordered'
                                                size='lg'
                                                placeholder='Masukkan email'
                                                className=''
                                                type='email'
                                                onChange={(e) => handlePayloadCredential(e.target.name, e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            <h3 className='text-lg font-bold'>Password</h3>
                                            <Input
                                                name='password'
                                                variant='bordered'
                                                size='lg'
                                                placeholder='Masukkan password'
                                                className=''
                                                type='text'
                                                onChange={(e) => handlePayloadCredential(e.target.name, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>NUPTK</h3>
                                    <Input
                                        name='nuptk'
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan NUPTK anda'
                                        className=''
                                        type='number'
                                        onChange={(e) => handleDataProfileGuru(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Tempat, Tanggal Lahir</h3>
                                    <Input
                                        name='ttl'
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan Tempat Tanggal Lahir'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleDataProfileGuru(e.target.name, e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                    <h3 className='text-lg font-bold'>Mulai Mengajar</h3>
                                    <Input
                                        name='start'
                                        variant='bordered'
                                        size='lg'
                                        placeholder='Masukkan tanggal mulai mengajar anda'
                                        className=''
                                        type='text'
                                        onChange={(e) => handleDataProfileGuru(e.target.name, e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <ActionGroup handleSubmitAddGuru={handleSubmitAddGuru} handleModal={handleModal} />
                    </div>
                </div>
            }
        </>
    )
}
export default ModalAddGuru

const ActionGroup = ({ handleSubmitAddGuru, handleModal }) => {
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
                    onPress={handleModal}
                >
                    <span>Kembali</span>
                </Button>
                <Button
                    radius='sm'
                    isDisabled={isLoad ? true : false}
                    className='w-[260px] bg-primer-500 text-white'
                    onPress={() => {
                        setIsLoad(true)
                        handleSubmitAddGuru()
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