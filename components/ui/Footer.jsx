import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
                <div className="mx-auto max-w-screen-xl text-center">
                    <Link href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
                        <img src='/logo.svg'/>
                        InterviewInsight
                    </Link>
                    <p className="my-6 text-gray-500 dark:text-gray-400">Prepare for interviews with our cutting-edge AI simulations that provide a realistic practice environment. </p>
                    
                        
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">InterviewInsight</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer