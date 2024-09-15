import { Input } from "@nextui-org/react"
import { Search } from "lucide-react"
const SearchTable = ()=>{
    return(
        <Input
                type="text"
                placeholder="Cari materi"
                size="md"
                // onChange={(e)=>{handleValueSearch(e.target.value)}}
                className="rounded-md shadow-md w-[300px]"
                endContent={
                    <button
                        aria-label="submit search"
                        className="focus:outline-none h-full flex flex-col items-center justify-center"
                        type="button"
                        // onClick={handleSearch}
                    >
                        <Search size={20} />
                    </button>
                }
            />
    )
}
export default SearchTable