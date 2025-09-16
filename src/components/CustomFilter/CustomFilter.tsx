"use client"
import { formatDate } from '@/lib/utilities/FilterUtilities'
import { InvoiveType } from '@/types/Invoice/Invoice'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type CustomFilterTypes = {
    setInvoiceData: Dispatch<SetStateAction<InvoiveType[]>>;
    setSelected: React.Dispatch<React.SetStateAction<string>>
    setDateDuration: React.Dispatch<React.SetStateAction<{
        start: string;
        end: string;
    }>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomFilter({ setSelected, setDateDuration, setInvoiceData, setIsOpen }: CustomFilterTypes) {
    const [customRange, setCustomRange] = useState<{ start: string; end: string }>({
        start: "",
        end: "",
    });

    let invoice: InvoiveType[] = [];

    useEffect(() => {
        const data = localStorage.getItem("invoice");

        if (data && data !== null) {
            invoice = JSON.parse(data);
        }
    })

    // custom filter
    const customFilter = () => {
        if (!customRange.start || !customRange.end) return;

        const start = new Date(customRange.start);
        const end = new Date(customRange.end);

        setSelected("Custom");
        setDateDuration({
            start: formatDate(start),
            end: formatDate(end),
        });

        if (invoice.length > 0) {
            const filtered = invoice.filter((inv) => {
                if (!inv.due_date) return false;
                const invDate = new Date(inv.due_date);
                return invDate >= start && invDate <= end;
            });
            setInvoiceData(filtered);
            setIsOpen(false);
        }
    };

    return (
        <div
            className="grid gap-2 mt-3 bg-white p-5 rounded-[20px]"
            onClick={(e) => {
                e.stopPropagation();
            }}>
            <div className='flex justify-center items-center gap-2'>
                <Input
                    type="date"
                    value={customRange.start}
                    onChange={(e) =>
                        setCustomRange((prev) => ({ ...prev, start: e.target.value }))
                    }
                />
                <span>-</span>
                <Input
                    type="date"
                    value={customRange.end}
                    onChange={(e) =>
                        setCustomRange((prev) => ({ ...prev, end: e.target.value }))
                    }
                />
            </div>
            <Button
                className="w-full"
                onClick={customFilter}>
                Apply
            </Button>
        </div>
    )
}

export default CustomFilter