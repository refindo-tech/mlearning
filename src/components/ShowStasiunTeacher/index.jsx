'use client'
import Draggable from 'react-draggable';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { ChevronsLeft } from 'lucide-react';
import Icons from '../Icons';
const MovableButton = ({ listStasiun, handleStasiun, manage }) => {
    const [showStations, setShowStations] = useState(false);
    // const draggableRef = useRef(null)
    const handleButtonClick = () => {
        setShowStations(!showStations);
    };
    return (
        <>
            <button
                onClick={() => handleButtonClick()}
                className='fixed right-0 bottom-5 w-[50px] h-[50px] z-20 lg:hidden rounded-l-full bg-gray-200 flex justify-center items-center shadow-2xl text-gray-600'
            >
                <ChevronsLeft />
            </button>
            {showStations &&
                <div className={`transition-transform duration-1000 ease-in-out transform ${showStations ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                z-20 w-full flex lg:hidden`} style={{ position: 'fixed', right: 0, top: '80px', }}>
                    <div className='w-[50vw] bg-gray-500/50 h-screen' onClick={handleButtonClick}>
                    </div>
                    <div className='bg-white px-3 w-[50vw] h-screen overflow-y-auto'>
                        <AsideTeacher
                            listStasiun={listStasiun}
                            manage={manage}
                            handleStasiun={handleStasiun}
                        />
                    </div>
                </div>
            }
            <div className='w-[15%] hidden lg:block'>
                <AsideTeacher
                    listStasiun={listStasiun}
                    manage={manage}
                    handleStasiun={handleStasiun}
                />
            </div>
        </>
    );
};
const AsideTeacher = ({ listStasiun, handleStasiun, manage }) => {
    const router = useRouter()
    const [totalStasiun, setTotalStasiun] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const path = usePathname()
    const { AddIcon } = Icons
    const idmapel = path.split('/')[2]
    const handleResult = () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/courseguru/${idmapel}/hasil`
        router.push(url)
    }
    const createNewStasiun = () => {
        setTotalStasiun((prev) => {
            const data = [...prev]
            if (data.length == 0) {
                return [...prev, 1]
            } else {
                const lastData = data[data.length - 1]
                return [...prev, lastData + 1]
            }
        })
    }
    const handleIsActive = () => {
        if (isActive) {
            setIsActive(false)
        } else {
            setIsActive(false)
        }
    }
    useEffect(() => {
        if (listStasiun) {
            setTotalStasiun(listStasiun.map((item) => {
                const count = parseInt(item.stasiun.split(' ')[1])
                return count
            }))
            // setDataListStasiun(listStasiun);
        }
    }, [listStasiun])
    return (
        <aside className="min-h-screen w-full py-10 flex flex-col items-center gap-7 overflow-y-visible">
            <h3 className="font-semibold text-xl text-center">Materi Belajar</h3>
            <div className="w-[90%] flex flex-col gap-4">
                {totalStasiun && totalStasiun.map((item, index) => (
                    <Button
                        onPress={() => handleStasiun(`stasiun ${item}`)}
                        variant="bordered"
                        className={`rounded-lg h-20 font-semibold shadow-lg border-0 hover:cursor-pointer}`}
                        key={index}
                    >
                        {`Stasiun ${item}`}
                    </Button>
                ))}
                {manage && manage === 'true' &&
                    <Button
                        variant="bordered"
                        className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold"
                        onPress={createNewStasiun}
                    >
                        <h3>Tambah stasiun</h3>
                        <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                            <AddIcon fill={'#110B63'} />
                        </div>
                    </Button>
                }
                <Button
                    onPress={handleResult}
                    variant="bordered"
                    className="rounded-lg h-20 font-semibold shadow-lg border-0 bg-gray-100 hover:cursor-pointer mb-14"
                >
                    Hasil Akhir
                </Button>
            </div>
        </aside>
    )
}

export default MovableButton;
