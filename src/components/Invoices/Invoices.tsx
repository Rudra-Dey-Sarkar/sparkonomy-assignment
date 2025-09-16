"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { InvoiveType } from '@/types/Invoice/Invoice'
import StatusSelection from '../StatusSelection/StatusSelection'
import { decideColorFromStatus } from '@/lib/utilities/InvoiceUtilities'
import { Bell, PenIcon } from 'lucide-react'
import DraftInvoiceForm from '../DraftInvoiceForm/DraftInvoiceForm'

function Invoices({ invoiceData, setInvoiceData }: { invoiceData: InvoiveType[], setInvoiceData: Dispatch<SetStateAction<InvoiveType[]>> }) {
    const [activeStatus, setActiveStatus] = useState<string>("");
    const [isDraftInvoiceFormOpen, setIsDraftInvoiceFormOpen] = useState<string>("");
    
        // notify client and save data
        const notifyClient = (id:string) => {
            const newInvoiceData = invoiceData.map(inv =>
                inv.id === id ? { ...inv, notify:inv.notify ? false : true } : inv
            )
            localStorage.setItem("invoice", JSON.stringify(newInvoiceData));
            setInvoiceData(newInvoiceData);
        }

    return (
        <div>
            {/* Draft Invoice form pop-up */}
            {isDraftInvoiceFormOpen &&
                <div
                    className="fixed flex justify-center items-center inset-0 bg-black/50"
                    onClick={() => {
                        setIsDraftInvoiceFormOpen("");
                    }}>
                    <DraftInvoiceForm
                        isDraftInvoiceFormOpen={isDraftInvoiceFormOpen}
                        setIsDraftInvoiceFormOpen={setIsDraftInvoiceFormOpen}
                        invoiceData={invoiceData}
                        setInvoiceData={setInvoiceData} />
                </div>
            }
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className='text-[16px] text-[#999999] font-semibold'>Your Invoices</AccordionTrigger>
                    <AccordionContent className='grid gap-2'>
                        {invoiceData.map((item) => (
                            <div
                                key={item.id}
                                className='flex justify-between items-center border-2 border-[#F2F2F2] p-5 rounded-[16px]'>
                                <div className='w-fit'>
                                    <p className='text-[14px] text-[#6B7280] font-semibold'>{item.name}</p>
                                    <p className='text-[12px] text-[#999999]'>${item.amount}, Due: {String(item.due_date)}</p>
                                </div>

                                <div className='w-fit flex justify-center items-center gap-4'>
                                    <button
                                        className={`px-4 py-[7px] rounded-full ${decideColorFromStatus(item.status)} ${activeStatus === item.id ? "hidden" : "visible"}`}
                                        onClick={() => setActiveStatus(item.id)}>{item.status}</button>

                                    {(activeStatus !== "" && activeStatus === item.id) &&
                                        <StatusSelection
                                            id={item.id}
                                            status={item.status}
                                            invoiceData={invoiceData}
                                            setInvoiceData={setInvoiceData}
                                            setActiveStatus={setActiveStatus} />
                                    }

                                    {item.status === "Draft" &&
                                        <button
                                            onClick={() => setIsDraftInvoiceFormOpen(item.id)}><PenIcon className='w-[20px] h-[20px] text-[#999999]' /></button>
                                    }

                                    {(item.status === "Awaited" || item.status === "Overdue") &&
                                        <button
                                            onClick={() => notifyClient(item.id)}><Bell className={`w-[20px] h-[20px] text-[#999999] ${item.notify ? "text-green-500" : ""}`} /></button>
                                    }
                                </div>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Invoices
