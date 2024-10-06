'use client'
import { useRouter } from "next/navigation"
import { Input, Image, Button, Link } from "@nextui-org/react"
import { useState } from "react"
import Icons from "@/components/Icons"
import { loginGuru } from '@/backend/fetchAPI.js'
const LoginPage = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null)
    const { EyeFilledIcon, EyeSlashFilledIcon } = Icons
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailValue = (value) => {
        setError(null)
        setEmail(value)
    }
    const handlePasswordValue = (value) => {
        setError(null)
        setPassword(value)
    }
    const handleLogin = () => {
        setIsLoad(true)
        const payload = {
            email: email,
            password: password
        }
        const fetchAPI = async () => {
            const response = await loginGuru(payload)
            if (response) {
                setIsLoad(false)
                console.log(response)
                sessionStorage.setItem('tokenguru', response.token)
                router.push('dashboardguru/')
            }else{
                setIsLoad(false)
                setError('Not any data that match')
            }
        }
        fetchAPI()
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-primer-400 to-primer-500 py-10">
            <div className="flex flex-col gap-[50px] items-center">
                <Image
                    alt="logo"
                    src={'/assets/image/logosma3.png'}
                    className="hidden lg:block h-[120px] w-[120px]"
                />
                <div className="flex flex-row items-end">
                    <Image
                        alt="logo"
                        src={'/assets/image/loginkiri.png'}
                        className="hidden lg:block lg:h-[500px] lg:w-[190px]"
                    />
                    <div className="w-[90%] bg-white rounded-lg py-[30px] flex flex-col items-center z-20">
                        <Image
                            alt="logo"
                            src={'/assets/image/logologinpage.png'}
                            className="block h-[70] w-[100]  lg:h-[80] lg:w-[198]"
                        />
                        <h3 className="my-5 font-bold text-xl text-center">Masuk</h3>
                        {error &&
                            <p className="text-xs text-danger-500 font-semibold text-center mb-2">{error}</p>
                        }
                        <div className="w-[90%] flex flex-col gap-5">
                            <Input
                                type="email"
                                color="default"
                                size='sm'
                                variant="light"
                                label="Email"
                                onChange={(e) => handleEmailValue(e.target.value)}
                                placeholder="Enter your email"
                            />
                            <Input
                                label="Password"
                                color="default"
                                size='sm'
                                variant="light"
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
                            <a href="/lupasandiguru" className="text-center">Lupa kata sandi?</a>
                            <a href="/login" className="text-center text-accent-orange underline">Masuk untuk siswa</a>
                        </div>
                    </div>
                    <Image
                        alt="logo"
                        src={'/assets/image/loginkanan.png'}
                        className="hidden lg:block lg:h-[500px] lg:w-[190px]"
                    />
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
