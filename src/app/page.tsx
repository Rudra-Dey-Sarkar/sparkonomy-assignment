"use client"

import { useEffect, useState } from "react";
import CreateInvoice from "@/components/CreateInvoice/CreateInvoice";
import InvoiceFilter from "@/components/InvoiceFilter/InvoiceFilter";
import InvoiceForm from "@/components/InvoiceForm/InvoiceForm";
import { InvoiveType } from "@/types/Invoice/Invoice";
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import Totals from "@/components/Totals/Totals";
import Chart from "@/components/Chart/Chart";
import Invoices from "@/components/Invoices/Invoices";
import ChartMessagePopUp from "@/components/ChartMessagePopUp/ChartMessagePopUp";

export default function Home() {
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<InvoiveType[]>([]);
  const form = useForm<InvoiveType>({
    defaultValues: {
      id: "",
      name: "",
      amount: "0",
      due_date: new Date((new Date().toISOString().split("T")[0])),
      notify: false,
      status: "Awaited"
    },
  });

  // invoice form submit cancel and make status draft
  const onCancelSubmit = () => {
    const invoiceData = localStorage.getItem("invoice");
    const newData: InvoiveType[] = [];

    const formData: InvoiveType = form.watch();

    if (invoiceData && invoiceData !== null) {
      newData.push(...JSON.parse(invoiceData));
    }

    newData.push({ ...formData, id:"invoice_" + uuid() + "_" + (new Date().getTime()),status: "Draft" });

    localStorage.setItem("invoice", JSON.stringify(newData));
    form.reset();
  }

  // collect invoice data
  useEffect(() => {
    const data = localStorage.getItem("invoice");
    if (data && data !== null) {
      setInvoiceData(JSON.parse(data));
      form.reset();
    }

  }, [isInvoiceFormOpen]);

  return (
    <div className="bg-[#E7CDE6]">
      {/* Invoice form pop-up */}
      {isInvoiceFormOpen &&
        <div
          className="fixed flex justify-center items-center inset-0 bg-black/50"
          onClick={() => {
            if (form.getValues("name") !== "" || form.getValues("amount") !== "0") {
              onCancelSubmit();
            }
            setIsInvoiceFormOpen(false);
          }}>
          <InvoiceForm
            setIsInvoiceFormOpen={setIsInvoiceFormOpen}
            form={form} />
        </div>
      }
      <div className="grid gap-5 bottom-0 rounded-t-[46px] sm:rounded-t-[20px] bg-white p-5">
        {/* Create new invoice */}
        <CreateInvoice setIsInvoiceFormOpen={setIsInvoiceFormOpen} />
        <p className="text-[12px] text-[#8134AF] text-center">Or Upload an existing invoice and set payment reminder</p>
        {/* Invoice filter */}
        <InvoiceFilter setInvoiceData={setInvoiceData} />
        {/* Totals */}
        <Totals invoiceData={invoiceData} />
        {/* Chart */}
        <ChartMessagePopUp>
          <div className="border-2 border-[#F2F2F2] p-5 rounded-[16px]">
            <p className="text-[#6B7280] text-[14px] font-semibold">Income Trend</p>
            <p className="text-[#6B7280] text-[14px]">Your monthly income and growth for the last 6 months.</p>
            <Chart />
          </div>
        </ChartMessagePopUp>
        {/* Invoices */}
        <Invoices invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
      </div>
    </div>
  );
}
