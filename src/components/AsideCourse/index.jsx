'use client'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { listStasiun } from "@/backend/fetchAPI.js"
import { Button, Link } from "@nextui-org/react"
const AsideCourse = () => {
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [idMapel, setIdMapel] =useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const path = usePathname()
    // setIdMapel(path.split('/')[2])
    // useEffect(()=>{
    //     setIsLoaded(true)
    // },[])
    useEffect(() => {
        const idmapel = path.split('/')[2]
        const fetchAPI = async () => {
            // if(!idMapel){
            //     console.log(idMapel)
            // }
            const req = { idmatapelajaran:idmapel}
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
                console.log(response)
            }
        }
        fetchAPI()
    }, [path])
    return (
        <aside className="w-full py-10 flex flex-col items-center border-r-2 border-gray-200 gap-7">
            <h3 className="font-semibold text-xl text-center">Materi Belajar</h3>
            <div className="w-[90%] flex flex-col gap-3">
                {dataListStasiun.map((item, index) => (
                    <Button
                        as={Link}
                        href={`${path}`+`/${item.stasiun}`}
                        variant="bordered"
                        className="rounded-lg h-12"
                        key={index}
                    >
                        {item.stasiun.toUpperCase()}
                    </Button>
                ))}
                {/* <Button
                    variant="bordered"
                    className="rounded-lg h-12"
                >
                    Stasiun 1
                </Button>
                <Button
                    variant="bordered"
                    className="rounded-lg h-12"
                >
                    Stasiun 1
                </Button> */}
                <Button
                    variant="bordered"
                    className="rounded-lg h-12"
                >
                    Hasil Akhir
                </Button>
            </div>
        </aside>
    )
}
export default AsideCourse