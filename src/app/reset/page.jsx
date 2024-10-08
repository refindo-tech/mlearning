'use client'
import Loading from "@/app/loading.jsx"
import { useState, useEffect } from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Input, Image, Button, Link } from "@nextui-org/react"
import { verifyTokenReset, resetPassword } from "@/backend/fetchAPI.js"
import Icons from '@/components/Icons'
const ResetPasswordPage = () => {
    const path = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('t')
    const email = searchParams.get('e')
    const [loadPage, setLoadPage] = useState(true)
    const [isLoad, setIsLoad] = useState(false)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isVisible1, setIsVisible1] = useState(false)
    const [isVisible2, setIsVisible2] = useState(false);
    const [error, setError] = useState(null)
    const toggleVisibility1 = () => setIsVisible1(!isVisible1);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    const { EyeFilledIcon, EyeSlashFilledIcon } = Icons
    const handlePasswordValue = (value)=>{
        setError (false)
        setPassword(value)
    }
    const handleConfirmPasswordValue = (value)=>{
        setError(false)
        setConfirmPassword(value)
    }
    const validation = ()=>{
        if(password !== confirmPassword){
            setError('Confirm password not same')
            return false
        }
        return true
    }
    const handleForgotPassword = async () => {
        setIsLoad(true)
    }
    const payload = {token,email,password}
    const changePassword = async()=>{
        validation()
        setIsLoad(true)
        const response = await resetPassword(payload)
        if(response){
            setIsLoad(false)
            router.push('/login')
        }
    }
    useEffect(()=>{
        const payload = {token,email}
        const fetchAPI = async()=>{
            const response = await verifyTokenReset(payload)
            if(response){
                setLoadPage(false)
                console.log(response)
                if(!response.status){
                    setError(response.message)
                    router.push('/')
                }
            }
        }
        fetchAPI()
    },[token, email, router])
    if(loadPage){
        return(<Loading/>)
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
                <h3 className="my-5 font-bold text-xl text-center">Reset Password</h3>
                {error&&
                    <p className="text-danger-500 text-xs font-semibold text-center mb-2">{error}</p>
                }
                <div className="w-[90%] flex flex-col gap-5">
                <Input
                        label="New Password"
                        color="default"
                        size='sm'
                        variant="light"
                        onChange={(e) => handlePasswordValue(e.target.value)}
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility1} aria-label="toggle password visibility">
                                {isVisible1 ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible1 ? "text" : "password"}
                    />
                    <Input
                        label="Confirm New Password"
                        color="default"
                        size='sm'
                        variant="light"
                        onChange={(e) => handleConfirmPasswordValue(e.target.value)}
                        placeholder="Enter confirmation password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility2} aria-label="toggle password visibility">
                                {isVisible2 ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible2 ? "text" : "password"}
                    />
                    <Button
                        onPress={changePassword}
                        isDisabled={isLoad?true:false}
                        className="h-[60px] bg-primer-500 text-white text-xl font-semibold"
                    >
                        {isLoad ? (
                            <div className="loader"></div>
                        ) : (
                            <p>Reset</p>
                        )}
                    </Button>
                    <p className="text-center">Sudah punya akun? <a href="/login">Masuk</a></p>
                    <Button
                        as={Link}
                        href="/register"
                        className="h-[60px] bg-gray-100 text-xl font-semibold shadow-xl"
                    >
                        Daftar
                    </Button>
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

export default ResetPasswordPage
