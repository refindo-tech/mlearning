'use client'
import { Input, Image, Button, Link } from "@nextui-org/react"

const ForgotPasswordPage = () => {
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
                <h3 className="my-5 font-bold text-xl text-center">Lupa Kata Sandi</h3>
                <div className="w-[90%] flex flex-col gap-5">
                    <Input
                        type="email"
                        color="default"
                        variant="light"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <Button
                        className="h-[60px] bg-primer-500 text-white text-xl font-semibold"
                    >
                        Konfirmasi
                    </Button>
                    <p className="text-center">Sudah punya akun? <a href="/login">Masuk</a></p>
                    <Button
                        as={Link}
                        href="/register"
                        className="h-[60px] bg-gray-100 text-xl font-semibold shadow-xl"
                    >
                        Daftar
                    </Button>
                    <a href="/login" className="text-center text-accent-orange underline">Masuk untuk guru</a>
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

export default ForgotPasswordPage
