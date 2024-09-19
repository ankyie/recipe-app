import React from 'react'

const Footer = () => {
  return (
    <div className='w-full flex justify-center items-center text-center hover:cursor-default bg-black text-white min-h-16'>
      <footer className=''>
        <div>
            <p className='font-bold'>Copyright &copy; All rights reserved.</p>
            <p className='text-gray-400 text-sm'>Made by <span className='font-bold'>Team V-ASS</span></p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
