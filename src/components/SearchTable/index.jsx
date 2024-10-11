'use client'
import { Input } from "@nextui-org/react"
import { Search } from "lucide-react"
import { useState } from "react"
const SearchTable = ({ value, handleValue }) => {
    const [inputValue, setInputValue] = useState(value)
    const handleChangeInput = (value) => {
        setInputValue(value)
    }
    return (
        <Input
            type="text"
            placeholder="Cari materi"
            size="md"
            // onChange={(e)=>{handleValueSearch(e.target.value)}}
            className="rounded-md shadow-md max-w-[300px]"
            onValueChange={(value) => { handleChangeInput(value) }}
            endContent={
                <button
                    aria-label="submit search"
                    className="focus:outline-none h-full flex flex-col items-center justify-center"
                    type="button"
                    onClick={() => handleValue(inputValue)}
                // onClick={handleSearch}
                >
                    <Search size={20} />
                </button>
            }
        />
    )
}
export default SearchTable