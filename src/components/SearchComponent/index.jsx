import { Search } from "lucide-react"
import { Input } from "@nextui-org/react"
const SearchComponent = () => {
    return (
        <>
            <Input
                type="text"
                placeholder="Cari materi"
                className="hidden lg:block rounded-md shadow-lg"
                endContent={
                    <button
                        aria-label="submit search"
                        className="focus:outline-none h-full flex flex-col items-center justify-center"
                        type="button"
                    >
                        <Search size={20} />
                    </button>
                }
            />
            <button
                    className="flex items-center lg:hidden"
                >
                    <Search size={20} />
            </button>
        </>
    )
}
export default SearchComponent