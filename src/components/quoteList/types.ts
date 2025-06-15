import type {HTMLAttributes, RefObject} from "react";
import type {quoteItem} from "../types.ts";

export interface QuoteListProps extends HTMLAttributes<HTMLUListElement>{
    quoteList: quoteItem[]
    ref?: RefObject<HTMLLIElement[]>
}