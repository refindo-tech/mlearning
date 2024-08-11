'use client'
import { Image, Calendar } from '@nextui-org/react'
import { today,getLocalTimeZone } from '@internationalized/date'
const Aside = () => {
    return (
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
                <h3 className="text-lg font-semibold">Berita & Info</h3>
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
    )
}
export default Aside