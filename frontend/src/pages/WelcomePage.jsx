import React from 'react'
import Carousel from '../components/Carousel'
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col xl:flex-row min-h-screen justify-around items-center bg-gray-100 p-4 mt-8 xl:mt-0'>
            <div className='w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10 lg:ml-8 mb-8 lg:mb-0'>
                <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-center lg:text-left'>Unlock the Potential of Your Data</h1>
                <p className='font-semibold text-xl md:text-2xl lg:text-3xl text-center lg:text-left'> Sign in to upload and analyse your Excel file</p>
                <div className='flex flex-col sm:flex-row justify-around lg:justify-start lg:gap-15 gap-5'>
                    <button className='btn bg-green-600 text-white rounded-xl font-semibold  text-xl md:text-3xl px-15 py-7 hover:bg-green-500' onClick={() => navigate('/login')}>Sign In</button>
                    <button className='btn text-green-600 border-2 border-gray-700 rounded-xl font-semibold text-xl md:text-3xl px-15 py-7' onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>
            <div className='w-full lg:w-1/2'>
                <Carousel />
            </div>
        </div>
    )
}

export default WelcomePage


