import type {ChangeEvent, HTMLAttributes} from "react";

export interface SearchInputProps extends HTMLAttributes<HTMLInputElement>{
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}