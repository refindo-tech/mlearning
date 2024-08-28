"use client"
import { useRouter } from "next/navigation"
import { Input, Image, Button, Link } from "@nextui-org/react"
import { useState } from "react"
import Icons from "@/components/Icons"
import { loginSiswa } from '@/backend/fetchAPI.js'
const LoginPage = () => {
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const { EyeFilledIcon, EyeSlashFilledIcon } = Icons
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailValue = (value) => {
        setEmail(value)
    }
    const handlePasswordValue = (value) => {
        setPassword(value)
    }
    const handleLogin = () => {
        setIsLoad(true)
        const payload = {
            email: email,
            password: password
        }
        const fetchAPI = async () => {
            const response = await loginSiswa(payload)
            if (response) {
                sessionStorage.setItem('tokensiswa', response.token)
                router.push('dashboard/')
            }
        }
        fetchAPI()
    }
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-primer-400 to-primer-500">
            <div className="w-[90%] lg:w-[30%] bg-white rounded-lg py-[30px] flex flex-col items-center z-20">
                <Image
                    alt="logo"
                    src={'/assets/image/logologinpage.png'}
                    className="block h-[70] w-[100]  lg:h-[80] lg:w-[198]"
                />
                <h3 className="my-5 font-bold text-xl text-center">Masuk</h3>
                <div className="w-[90%] flex flex-col gap-5">
                    <Input
                        type="email"
                        color="default"
                        size='sm'
                        variant="light"
                        label="Email"
                        value={email}
                        onChange={(e) => handleEmailValue(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <Input
                        label="Password"
                        color="default"
                        size='sm'
                        variant="light"
                        value={password}
                        onChange={(e) => handlePasswordValue(e.target.value)}
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
                        onPress={handleLogin}
                        isDisabled={isLoad?true:false}
                        className="h-[60px] bg-primer-500 text-white text-xl font-semibold"
                    >
                        {isLoad ? (
                            <div className="loader"></div>
                        ) : (
                            <p>Masuk</p>
                        )}
                    </Button>
                    <a href="/lupasandi" className="text-center">Lupa kata sandi?</a>
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

export default LoginPage
