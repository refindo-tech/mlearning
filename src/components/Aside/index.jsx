'use client'
import { Image, Calendar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { today, getLocalTimeZone } from '@internationalized/date'
import { accessGuru, listNews, deleteNews } from '@/backend/fetchAPI'
import ModalAddBerita from '@/components/ModalAddBerita'
import Icons from '../Icons'
const Aside = () => {
    const router = useRouter()
    const [access, setAccess] = useState(false)
    const [dataListNews, setDataListNews] = useState(null)
    const [isActiveModal, setIsActiveModal] = useState(false)
    const { AddIcon, HorizontalDots } = Icons
    useEffect(() => {
        const verify = async () => {
            const response = await accessGuru()
            if (response) {
                if (response.access) {
                    setAccess(true)
                } else {
                    setAccess(false)
                }
            }
            const responseList = await listNews()
            if (responseList) {
                console.log(responseList)
                setDataListNews(responseList.data)
            }
        }
        verify()
    }, [])
    const handleModal = () => {
        setIsActiveModal(!isActiveModal)
    }
    const handleDeleteNews = (value) => {
        const payload = {
            idNews: value
        }
        const fetchAPI = async () => {
            const response = await deleteNews(payload)
            if (response) {
                window.location.reload()
            }
        }
        fetchAPI()
    }
    return (
        <>
            <ModalAddBerita active={isActiveModal} inActiveModalBerita={handleModal} />
            <div className="hidden lg:basis-1/4 lg:flex lg:flex-col lg:gap-7 py-7">
                <div className="w-[80%] mx-auto flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">Kalender</h3>
                    <Calendar
                        aria-label="view-calendar"
                        value={today(getLocalTimeZone())}
                        isReadOnly
                    />
                </div>
                <div className="w-[80%] mx-auto flex flex-col gap-3">
                    <div className='w-full flex items-center justify-between'>
                        <h3 className="text-lg font-semibold">Berita & Info</h3>
                        {access &&
                            <Button
                                isIconOnly={true}
                                className='rounded-full'
                                onPress={handleModal}
                            >
                                <div className='h-10 w-10 rounded-full bg-primer-500 flex items-center justify-center'>
                                    <AddIcon />
                                </div>
                            </Button>
                        }
                    </div>
                    {dataListNews && dataListNews.length !== 0 ?
                        (
                            <div className="h-[50vh] overflow-y-auto rounded-xl border-2 border-gray-200">
                                <div className='flex flex-col'>
                                    {dataListNews?.map((item, index) => (
                                        <div className='w-full border-b-2 border-gray-300 px-1' key={index}>
                                            <div className='w-full flex justify-between'>
                                                <div className='ql-editor max-w-[250px] text-wrap' dangerouslySetInnerHTML={{ __html: item.text }} />
                                                {access &&
                                                    <Dropdown>
                                                        <DropdownTrigger
                                                            variant='light'
                                                        >
                                                            <div>
                                                                <HorizontalDots />
                                                            </div>
                                                        </DropdownTrigger>
                                                        <DropdownMenu
                                                            onAction={(key) => {
                                                                if (key === 'delete') {
                                                                    handleDeleteNews(item.id)
                                                                }
                                                            }}
                                                        >
                                                            <DropdownItem
                                                                key={'delete'}
                                                                color='danger'
                                                            // onPress={()=>{
                                                            //     handleDeleteNews(item.id)
                                                            // }}
                                                            >
                                                                Delete
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) :
                        (
                            <div className="h-[50vh] flex items-center justify-center rounded-xl border-2 border-gray-200">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-center">
                                        <Image
                                            alt="icon-card"
                                            src="/assets/image/paper airplane.png"
                                            className="block h-[70px] w-[70px]"
                                        />
                                    </div>
                                    <p>Belum ada berita terbaru</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="w-[80%] mx-auto flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">Fitur lainnya</h3>
                    <div className="h-[50vh] flex items-center justify-center rounded-xl bg-primer-400 text-white">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-center">
                                <Image
                                    alt="icon-card"
                                    src="/assets/image/red clock.png"
                                    className="block h-[70px] w-[70px]"
                                />
                            </div>
                            <p>Oops... nantikan fitur lainnya disini</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Aside