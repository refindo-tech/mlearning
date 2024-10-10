'use client'
import Draggable from 'react-draggable';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import AsideTeacher from '../AsideTeacher';
const MovableButton = ({ onShowStations, listStasiun, handleStasiun, manage }) => {
    const [showStations, setShowStations] = useState(false);
    const draggableRef = useRef(null)
    const handleButtonClick = () => {
        setShowStations(!showStations);
        onShowStations()
    };
    return (
        <>
            <button
                onClick={() => handleButtonClick()}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#007bff',
                    borderRadius: '50%',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'fixed',
                    bottom: 20,
                    right: 20
                }}
                className='z-20 lg:hidden'
            >
                +
            </button>
            {showStations &&
                <div className='z-20 w-full flex' style={{ position: 'fixed', right: 0, top: '80px', }}>
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
