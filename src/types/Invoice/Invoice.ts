export type InvoiveType = {
    id:string;
    name: string;
    amount: string;
    due_date: string;
    notify:boolean;
    status:  StatusType;
}

export type StatusType = "Paid" | "Partially Paid" | "Unpaid" | "Overdue" | "Awaited" | "Draft" | "Disputed";