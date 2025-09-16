"use client"

import { InvoiveType } from '@/types/Invoice/Invoice'
import React, { useEffect, useState } from 'react'

function Totals({ invoiceData }: { invoiceData: InvoiveType[] }) {
    const [totals, setTotals] = useState<{ earning: number; awaited: number; overdue: number }>({
        earning: 0,
        awaited: 0,
        overdue: 0
    });

    useEffect(() => {
        let earning = 0;
        let awaited = 0;
        let overdue = 0;

        invoiceData.forEach((invoice) => {
            const amount = Number(invoice.amount) || 0; // safer than parseInt

            if (invoice.status === "Paid" || invoice.status === "Partially Paid") {
                earning += amount;
            } else if (invoice.status === "Awaited") {
                awaited += amount;
            } else if (invoice.status === "Overdue") {
                overdue += amount;
            }
        });

        setTotals({ earning, awaited, overdue });

    }, [invoiceData]);

    return (
        <div className='grid gap-5 '>
            {/* Total Earnings Paid + Partially Paid */}
            <div className='text-[16px] font-semibold text-[#999999] border-2 border-[#F2F2F2] p-5 rounded-[16px]'>
                <p>Total Earnings</p>
                <p className='text-[#8134AF] text-[20px]'>${totals.earning}</p>
            </div>
            <div className='flex gap-5'>
                <div className='w-full text-[16px] font-semibold text-[#999999] border-2 border-[#F2F2F2] p-5 rounded-[16px]'>
                    <p>Payment Awaited</p>
                    <p className='text-[#8134AF] text-[19px]'>${totals.awaited}</p>
                </div>
                <div className='w-full text-[16px] font-semibold text-[#999999] border-2 border-[#F2F2F2] p-5 rounded-[16px]'>
                    <p>Payment Overdue</p>
                    <p className='text-[#8134AF] text-[19px]'>${totals.overdue}</p>
                </div>
            </div>
        </div>
    )
}

export default Totals