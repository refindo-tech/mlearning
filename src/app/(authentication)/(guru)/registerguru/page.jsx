'use client'
import { Input, Image, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Icons from "@/components/Icons"
import {registerGuru} from '@/backend/fetchAPI.js'
const RegisterPage = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const { EyeFilledIcon, EyeSlashFilledIcon } = Icons
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [name,setName] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [error, setError] = useState(null)
    const handleEmailValue = (value)=>{
        setEmail(value)
        setError(null)
    }
    const handleNameValue = (value)=>{
        setName(value)
        setError(null)
    }
    const handlePasswordValue = (value)=>{
        setPassword(value)
        setError(null)
    }
    const handleSubmit = ()=>{
        const payload = {
            email:email,
            password:password,
            name:name
        }
        const fetchAPI = async ()=>{
            const response = await registerGuru(payload)
            if(response.message === 'success'){
                console.log(response)
                router.push('login/')
            }else{
                setError(response.message)
            }
        }
        fetchAPI()
    }
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-primer-400 to-primer-500">
            <div className="w-[90%] lg:w-[25%] bg-white rounded-lg py-[30px] flex flex-col items-center z-20">
                <Image
                    alt="logo"
                    height={80}
                    width={198}
                    src={'/assets/image/logologinpage.png'}
                    className="block"
                />
                <h3 className="my-5 font-bold text-xl text-center">Daftar</h3>
                {error&&
                    <p className=" text-accent-red text-xs mb-2">{error}</p>
                }
                <div className="w-[90%] flex flex-col gap-5">
                    <Input
                        type="text"
                        color="default"
                        variant="light"
                        label="Name"
                        onChange={(e)=>handleNameValue(e.target.value)}
                        placeholder="Masukkan nama anda"
                        />
                    <Input
                        type="email"
                        color="default"
                        variant="light"
                        label="Email"
                        onChange={(e)=>handleEmailValue(e.target.value)}
                        placeholder="Enter your email" />
                    <Input
                        label="Password"
                        color="default"
                        variant="light"
                        onChange={(e)=>handlePasswordValue(e.target.value)}
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                    />
                    <Button
                        onPress={handleSubmit}
                        className="h-[60px] bg-primer-500 text-white text-xl font-semibold"
                    >
                        Daftar
                    </Button>
                    <p href="/" className="text-center">Sudah punya akun? <a href="/login">masuk</a></p>
                    <a href="/" className="text-center text-accent-orange underline">Masuk untuk guru</a>
                </div>
            </div>
            <div className="absolute top-0 right-0">
                <Image
                    alt="logo"
                    height={160}
                    width={106}
                    src={'/assets/image/pensil.png'}
                    className="block"
                />
            </div>
            <div className="absolute top-[10vh] left-0">
                <div className="w-[80px] h-[200px] bg-accent-red"></div>
            </div>
            <div className="absolute bottom-[10vh] right-0">
                <div className="w-[80px] h-[200px] bg-accent-green"></div>
            </div>
            <div className="absolute bottom-0 left-0">
                <Image
                    alt="logo"
                    height={140}
                    width={200}
                    src={'/assets/image/jangka.png'}
                    className="block"
                />
            </div>
        </div>
    )
}

export default RegisterPage
