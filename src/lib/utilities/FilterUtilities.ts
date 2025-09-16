import { InvoiveType } from "@/types/Invoice/Invoice";

export const formatDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}:${String(d.getMonth() + 1).padStart(
        2,
        "0"
    )}:${d.getFullYear()}`;