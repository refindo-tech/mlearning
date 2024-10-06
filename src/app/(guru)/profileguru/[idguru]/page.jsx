'use client'
import { Button, Image } from '@nextui-org/react'
import Loading from '@/app/loading'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { accessGuru, getDetailProfileGuru } from '@/backend/fetchAPI.js'
const ProfileGuru = () => {
    const path = usePathname()
    const idguru = path.split('/')[2]
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(true)
    const [detailGuru, setDetailGuru] = useState(null)
    useEffect(() => {
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/')
            }
            let payload = {
                idguru: parseInt(idguru)
            }
            const response = await getDetailProfileGuru(payload)
            if (response) {
                setDetailGuru(response.data)
                setIsLoad(false)
            } else {
                router.push('/onboarding')
            }
        }
        fetchAPI()
    }, [router, idguru])
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
                <ActionGroup />
            </div>
            <Footer />
        </div>
    )
}
export default ProfileGuru

const ActionGroup = () => {
    const router = useRouter()
    const url = usePathname()
    const idsiswa = url.split('/')[2]
    const handleBack = () => {
        const newUrl = url.replace(`${idsiswa}`, '')
        router.push(newUrl)
    }
    const handleEdit = () => {
        const newUrl = url.replace(`${url}`, `${url}/edit`)
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
                    className='w-[260px] bg-primer-500 text-white'
                    onPress={handleEdit}
                >
                    <span>Edit</span>
                </Button>
            </div>
        </div>
    )
}