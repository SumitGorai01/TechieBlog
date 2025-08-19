import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Loader2, X } from 'lucide-react'

function Searchbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!search.trim()) return

    setIsLoading(true)
    
    setTimeout(() => {
      const slug = search.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
      navigate(`/search/${slug}`)
      setIsLoading(false)
    }, 300)
  }

  const clearSearch = () => {
    setSearch('')
  }

  return (
    <div className="hidden sm:flex justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="relative group w-full max-w-2xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-orange-500/20 rounded-2xl blur-xl transition-all duration-500 ${
          isFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
        }`}></div>

        <div className={`relative flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border transition-all duration-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl ${
          isFocused 
            ? 'border-orange-400/60 dark:border-orange-500/50 shadow-orange-500/10' 
            : 'border-orange-200/40 dark:border-orange-800/30 hover:border-orange-300/60 dark:hover:border-orange-700/50'
        }`}>
          
          <div className="flex items-center justify-center pl-5 pr-2">
            <Search 
              size={20} 
              className={`transition-all duration-300 ${
                isFocused 
                  ? 'text-orange-500 dark:text-orange-400 scale-110' 
                  : 'text-orange-400 dark:text-orange-500 group-hover:text-orange-500 dark:group-hover:text-orange-400'
              }`} 
            />
          </div>

          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search blogs, articles, topics..."
            className="flex-1 px-2 py-4 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm font-medium"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="flex items-center justify-center p-2 mx-1 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            >
              <X size={16} />
            </button>
          )}

          <button 
            type="submit"
            disabled={!search.trim() || isLoading}
            className={`flex items-center justify-center px-5 py-4 ml-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
              search.trim()
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25'
                : 'bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 text-orange-400 dark:text-orange-500'
            }`}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Search size={18} />
            )}
          </button>
        </div>

        

        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 transition-opacity duration-300 ${
          isFocused || search ? 'opacity-0' : 'opacity-100'
        }`}>
        </div>
      </form>
    </div>
  )
}

export default Searchbar