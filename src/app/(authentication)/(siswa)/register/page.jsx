'use client'
import { Input, Image, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Icons from "@/components/Icons"
import { registerSiswa } from '@/backend/fetchAPI.js'
const RegisterPage = () => {
    const router = useRouter()
    const [isLoad, setIsLoad] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { EyeFilledIcon, EyeSlashFilledIcon } = Icons
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const handleEmailValue = (value) => {
        setEmail(value)
        setError(null)
    }
    const handleNameValue = (value) => {
        setName(value)
        setError(null)
    }
    const handlePasswordValue = (value) => {
        setPassword(value)
        setError(null)
    }
    const handleSubmit = () => {
        const payload = {
            email: email,
            password: password,
            name: name
        }
        setIsLoad(true)
        const fetchAPI = async () => {
            const response = await registerSiswa(payload)
            if (response.message === 'success') {
                console.log(response)
                router.push('login/')
            } else {
                setError(response.message)
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
                            height={80}
                            width={198}
                            src={'/assets/image/logologinpage.png'}
                            className="block"
                        />
                        <h3 className="my-5 font-bold text-xl text-center">Daftar</h3>
                        {error &&
                            <p className=" text-accent-red text-xs mb-2">{error}</p>
                        }
                        <div className="w-[90%] flex flex-col gap-5">
                            <Input
                                type="text"
                                color="default"
                                variant="light"
                                label="Name"
                                value={name}
                                onChange={(e) => handleNameValue(e.target.value)}
                                placeholder="Masukkan nama anda"
                            />
                            <Input
                                type="email"
                                color="default"
                                variant="light"
                                label="Email"
                                value={email}
                                onChange={(e) => handleEmailValue(e.target.value)}
                                placeholder="Enter your email" />
                            <Input
                                label="Password"
                                color="default"
                                variant="light"
                                password={password}
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
                                onPress={handleSubmit}
                                isDisabled={isLoad ? true : false}
                                className="h-[60px] bg-primer-500 text-white text-xl font-semibold"
                            >
                                {isLoad ? (
                                    <div className="loader"></div>
                                ) : (
                                    <p>Daftar</p>
                                )}
                            </Button>
                            <p className="text-center">Sudah punya akun? <a href="/login">masuk</a></p>
                            <a href="/loginguru" className="text-center text-accent-orange underline">Masuk untuk guru</a>
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

export default RegisterPage
