"use client"

import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function ChartMessagePopUp({ children }: { children: React.ReactNode; }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p className='text-[15px]'>I'm new to combo chart 📊📈 development so chart is basically static as of now and if I get some time I'll fix 🛠️ it as well 😁, don't worry and rest of the elements are fully functional</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default ChartMessagePopUp