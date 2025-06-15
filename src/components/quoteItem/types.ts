import type {HTMLAttributes, RefObject} from "react";

export interface QuoteItemProps extends HTMLAttributes<HTMLLIElement>{
    body: string
    author: string
    ref?: RefObject<HTMLLIElement>| ((instance: HTMLLIElement) => void)
}