'use client'
import Draggable from 'react-draggable';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { ChevronsLeft } from 'lucide-react';
import AsideTeacher from '../AsideTeacher';
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
                    <div className='w-full bg-gray-500/50 h-screen' onClick={handleButtonClick}>
                    </div>
                    <div className='bg-white px-3'>
                        <AsideTeacher
                            listStasiun={listStasiun}
                            manage={manage}
                            handleStasiun={handleStasiun}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default MovableButton;
