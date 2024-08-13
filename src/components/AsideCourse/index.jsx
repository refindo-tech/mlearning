import { Button } from "@nextui-org/react"
const AsideCourse = () => {
    return (
        <aside className="w-[15%] hidden py-10 lg:flex flex-col items-center border-r-2 border-gray-200 gap-7">
            <h3 className="font-semibold text-xl text-center">Materi Belajar</h3>
            <div className="w-[90%] flex flex-col gap-3">
                <Button
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
                </Button>
                <Button
                    variant="bordered"
                    className="rounded-lg h-12"
                >
                    Stasiun 1
                </Button>
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