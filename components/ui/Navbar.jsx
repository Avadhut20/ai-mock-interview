import React from 'react'
import logo from '../../public/logo.svg'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div>
        <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href={"/"} className="flex items-center">
                <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Interview Insight Logo" />
                <span className="self-center text-xl text-primary font-semibold whitespace-nowrap dark:text-white">InterviewInsight</span>
            </Link  >
            <div className="flex items-center lg:order-2">
                <Link href={"/dashboard"} className="text-white dark:text-white bg-primary focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Get Started</Link  >
                
               
            </div>
            
        </div>
    </nav>
</header>
    </div>
  )
}

export default Navbar