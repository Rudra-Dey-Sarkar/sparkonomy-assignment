"use client"

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { InvoiveType, StatusType } from '@/types/Invoice/Invoice';
import { ChevronDown } from 'lucide-react';

function StatusSelection({ id, status, invoiceData, setInvoiceData, setActiveStatus }: { id: string, status: StatusType, invoiceData: InvoiveType[], setInvoiceData: React.Dispatch<React.SetStateAction<InvoiveType[]>>, setActiveStatus: React.Dispatch<React.SetStateAction<string>> }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const statusOptions = [
        "Paid",
        "Partially Paid",
        "Unpaid",
        "Overdue",
        "Awaited",
        "Draft",
        "Disputed"
    ];

    //change status and save result
    const controlStatusChange = (newStatus: StatusType) => {
        const newInvoiceData = invoiceData.map(inv =>
            inv.id === id ? { ...inv, status: newStatus } : inv
        )
        localStorage.setItem("invoice", JSON.stringify(newInvoiceData))
        setInvoiceData(newInvoiceData);
        setActiveStatus("")
    };

    return (
        <Select
            value={status}
            onValueChange={controlStatusChange}
            open={isOpen}
            onOpenChange={setIsOpen}>
            <SelectTrigger
                className={`rounded-full text-sm font-medium w-[145px] h-[32px] bg-[#8134AF]`} >
                <p className={`text-white text-center`}>Update Status</p>
                <ChevronDown
                    className={`text-white transition-transform duration-500 ease-in-out ${isOpen ? "rotate-0" : "rotate-180"
                        }`} />
            </SelectTrigger>
            <SelectContent>
                {statusOptions.map((status) => (
                    <SelectItem
                        key={status}
                        value={status}>{status}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default StatusSelection