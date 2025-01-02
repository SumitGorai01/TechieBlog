import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Searchbar() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault()
        const slug = search.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g,"-")
        .replace(/\s/g, "-")
        navigate(`/search/${slug}`)
        
    }
    return (
        <form onSubmit={handlesubmit} className='flex items-center justify-center w-[full] md:w-auto'>
            <input 
            type="text" 
            name="search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search blogs'
            className='px-4 py-2 w-[70%] md:w-full bg-transparent border outline-none rounded-tl-md rounded-bl-md' />
            <button className='border px-3 py-2 rounded-tr-md rounded-br-md' type='submit'>Search</button>
        </form>
    )
}

export default Searchbar
