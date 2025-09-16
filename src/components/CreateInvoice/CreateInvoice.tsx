"use client"
import Image from 'next/image'

import React, { Dispatch, SetStateAction } from 'react'

function CreateInvoice({setIsInvoiceFormOpen}:{setIsInvoiceFormOpen: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className='flex flex-col justify-center items-center bg-[#F2F2F2] p-5 rounded-[32px]'>
            <button
                className='hover:cursor-pointer'
                onClick={() => setIsInvoiceFormOpen(true)}>
                <Image
                    src="/icons/create-invoice.svg"
                    alt="back icon"
                    width={50}
                    height={50} />
            </button>

            <div className='flex flex-col justify-center items-center'>
                <p className="text-[24px] w-fit font-semibold bg-gradient-to-br from-[#DD2A7B] via-[#9747FF] to-[#334CCA] bg-clip-text text-transparent">Create New Invoice</p>
                <p className='text-[12px] w-fit text-[#999999]'>Start by creating and sending new invoice</p>
            </div>
        </div>
    )
}

export default CreateInvoice