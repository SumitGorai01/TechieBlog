import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault()
        const slug = search.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
        navigate(`/search/${slug}`)

    }
    return (
        <div className="justify-center w-full hidden md:flex"> 
        <form 
          onSubmit={handlesubmit} 
          className="flex items-center justify-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] border border-orange-400 rounded-full"
        >
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs"
            className="px-4 py-2 w-full bg-transparent outline-none"
          />
          <button className="px-2 py-2 rounded-tr-md rounded-br-md" type="submit">
            <SearchIcon className="text-orange-500" fontSize="medium" />
          </button>
        </form>
      </div>
      
    )
}

export default Searchbar
