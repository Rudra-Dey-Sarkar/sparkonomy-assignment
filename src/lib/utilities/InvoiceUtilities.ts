import { StatusType } from "@/types/Invoice/Invoice";

const statusClass: Record<StatusType, string > = {
  Paid: "bg-[#9CEFB8] text-[#34C759]",
  "Partially Paid": "bg-[#FFFAE5] text-[#FFCC00]",
  Unpaid: "bg-[#F2F2F2] text-[#999999]",
  Overdue: "bg-[#FFB1B1] text-[#FF2D55]",
  Awaited: "bg-[#FFFAE5] text-[#FFCC00]",
  Draft: "bg-[#F2F2F2] text-[#999999]",
  Disputed: "bg-[#FFB1B1] text-[#FF2D55]",
};

export const decideColorFromStatus = (status: StatusType):string => {
    return statusClass[status as keyof typeof statusClass];
};