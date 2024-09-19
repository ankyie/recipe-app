import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='sticky top-0 z-20'>
      <nav className='flex gap-3 justify-center items-center min-h-16 bg-black'>
        <ul className='flex gap-3 justify-center items-center text-center'>
            <li><Link href="/" className='px-3 py-1 font-semibold rounded-full border border-zinc-400 hover:border-white text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] duration-200'>Home</Link></li>
            <li><Link href="https://spoonacular.com/food-api" target='_blank' className='px-3 py-1 font-semibold rounded-full border border-zinc-400 hover:border-white text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] duration-200'>Database</Link></li>
            <li><Link href="https://github.com/ankyie" target='_blank' className='px-3 py-1 font-semibold rounded-full border border-zinc-400 hover:border-white text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] duration-200'>GitHub</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
