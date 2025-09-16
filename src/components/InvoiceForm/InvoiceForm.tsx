"use client"

import React, { Dispatch, SetStateAction } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { InvoiveType } from '@/types/Invoice/Invoice';
import { Label } from '../ui/label';
import { UseFormReturn } from 'react-hook-form';
import { v4 as uuid } from 'uuid';


type InvoiceFormType = {
    setIsInvoiceFormOpen: Dispatch<SetStateAction<boolean>>;
    form: UseFormReturn<InvoiveType, any, InvoiveType>
}

function InvoiceForm({ setIsInvoiceFormOpen, form }: InvoiceFormType) {

    const statusOptions = [
        "Paid",
        "Partially Paid",
        "Unpaid",
        "Overdue",
        "Awaited",
        "Draft",
        "Disputed"
    ];

    // invoice form submit
    const onSubmit = (data: InvoiveType) => {
        const invoiceData = localStorage.getItem("invoice");
        const newData: InvoiveType[] = [];

        if (invoiceData && invoiceData !== null) {
            newData.push(...JSON.parse(invoiceData));
        }

        newData.push({...data, id:"invoice_" + uuid() + "_" + (new Date().getTime())});

        localStorage.setItem("invoice", JSON.stringify(newData));
        setIsInvoiceFormOpen(false);

    }

    return (

        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 bg-white p-5 w-[90vw] sm:w-[50vw] rounded-[20px]"
            onClick={(e) => e.stopPropagation()}>
            <Label className='text-[14px]'>Client Name*</Label>
            <Input
                {...form.register("name", { required: true })}
                placeholder="Jon Doe"
            />

            <div className='flex gap-2'>
                <div>
                    <Label className='text-[14px]'>Amount (USD)*</Label>
                    <Input
                        {...form.register("amount", { required: true })}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Amount"
                    />
                </div>
                <div>
                    <Label className='text-[14px]'>Due Date*</Label>
                    <Input
                        {...form.register("due_date", { required: true })}
                        type="date"
                        value={form.watch("due_date") ? new Date(form.watch("due_date")).toISOString().split("T")[0] : ""}
                        onChange={e => {
                            form.setValue("due_date", e.target.value)
                        }}
                        placeholder="Due Date"
                    />
                </div>
            </div>

            <Label className='text-[14px]'>Status*</Label>
            <select
                {...form.register("status", { required: true })}
                className="border rounded px-2 py-1"
            >
                {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>

            <Button type="submit">Save</Button>
        </form>
    )
}

export default InvoiceForm