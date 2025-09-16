"use client"

import React from 'react'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useForm } from 'react-hook-form'
import UserProfile from '../UserProfile/UserProfile'

function Navbar() {
  
    return (
        <div className='bg-[#E7CDE6] text-[17px] flex justify-between items-center px-2 py-3'>
            <button
                className='flex gap-2 hover:cursor-pointer hover:scale-105'
                title='Back button'>
                <Image
                    src="/icons/back.svg"
                    alt="back icon"
                    width={15}
                    height={20} />
                <p className=''>Back</p>
            </button>

            <p className='font-semibold'>Dashboard</p>

            <UserProfile />
        </div>
    )
}

export default Navbar