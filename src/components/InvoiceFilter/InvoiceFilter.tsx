"use client";

import { InvoiveType } from "@/types/Invoice/Invoice";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { Input } from "../ui/input";
import { formatDate } from "@/lib/utilities/FilterUtilities";
import CustomFilter from "../CustomFilter/CustomFilter";


function InvoiceFilter({
    setInvoiceData,
}: {
    setInvoiceData: Dispatch<SetStateAction<InvoiveType[]>>;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>("");
    const [dateDuration, setDateDuration] = useState<{
        start: string;
        end: string;
    }>({
        start: "dd:mm:yyyy",
        end: "dd:mm:yyyy",
    });

    let invoice: InvoiveType[] = [];

    const options = [
        { value: "1Month", label: "1Month" },
        { value: "3Month", label: "3Month" },
        { value: "1Year", label: "1Year", premium: true },
    ];

    useEffect(() => {
        const data = localStorage.getItem("invoice");

        if (data && data !== null) {
            invoice = JSON.parse(data);
        }
    })

    // static filter
    const staticFilter = (date: string) => {
        setSelected(date);

        const now = new Date();

        // 1st day of current month
        const start = new Date(now.getFullYear(), now.getMonth(), 1);

        let end: Date;

        if (date === "1Month") {
            // End = last day of current month
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        } else if (date === "3Month") {
            // End = last day of 3 months later
            end = new Date(now.getFullYear(), now.getMonth() + 3, 0);
        } else {
            // End = last day of 12 months later
            end = new Date(now.getFullYear(), now.getMonth() + 12, 0);
        }

        // update visible date range
        setDateDuration({
            start: formatDate(start),
            end: formatDate(end),
        });

        // Filter invoices whose due_date lies in range
        if (invoice.length > 0) {
            const filtered = invoice.filter((inv) => {
                if (!inv.due_date) return false; // skip if missing
                const invDate = new Date(inv.due_date); // works for "YYYY-MM-DD"
                return invDate >= start && invDate <= end;
            });

            setInvoiceData(filtered);
        }

    };

    return (
        <div className="text-[14px] text-[#999999] border-2 border-[#F2F2F2] p-5 rounded-[16px]">
            {/* Custom date selection pop up */}
            {isOpen &&
                <div
                    className="fixed flex justify-center items-center inset-0 bg-black/50"
                    onClick={() => setIsOpen(false)}>
                    <CustomFilter
                        setSelected={setSelected}
                        setDateDuration={setDateDuration}
                        setInvoiceData={setInvoiceData}
                        setIsOpen={setIsOpen} />
                </div>
            }
            <div className="flex justify-between">
                <p className="font-semibold">Time Period</p>
                <div className="flex gap-2 text-[12px]">
                    <p>{dateDuration.start}</p>
                    <p>-</p>
                    <p>{dateDuration.end}</p>
                </div>
            </div>

            <div className="flex gap-5 py-2">
                {options.map((opt) => (
                    <Label
                        key={opt.value}
                        className={`px-2 py-1 border-1 rounded-full cursor-pointer flex items-center gap-1 border-[#999999]
              ${selected === opt.value
                                ? "bg-[#F3E8FF]"
                                : "text-[#999999]"
                            }`}>
                        <p className={`${selected === opt.value
                            ? "bg-gradient-to-br from-[#DD2A7B] via-[#9747FF] to-[#334CCA] bg-clip-text text-transparent"
                            : "text-[#999999]"
                            }`}>
                            {opt.label}
                        </p>
                        {opt.premium && (
                            <Image
                                src="/icons/crown.svg"
                                alt="premium"
                                width={20}
                                height={19}
                            />
                        )}
                        <Input
                            type="radio"
                            name="timePeriod"
                            value={opt.value}
                            checked={selected === opt.value}
                            onChange={() => staticFilter(opt.value)}
                            className="hidden"
                        />
                    </Label>
                ))}
            </div>

            <div>
                <button
                    className={`px-2 py-1 border-1 rounded-full cursor-pointer flex items-center gap-1 border-[#999999]
              ${selected === "Custom"
                            ? "bg-[#F3E8FF]"
                            : "text-[#999999]"
                        }`}
                    onClick={() => setIsOpen(true)}>

                    <Image
                        src="/icons/calendar.svg"
                        alt="calendar"
                        width={20}
                        height={20}
                    />
                    <p className={`${selected === "Custom"
                        ? "bg-gradient-to-br from-[#DD2A7B] via-[#9747FF] to-[#334CCA] bg-clip-text text-transparent"
                        : "text-[#999999]"
                        }`}>
                        Custom
                    </p>
                </button>
            </div>
        </div >
    );
}

export default InvoiceFilter;
