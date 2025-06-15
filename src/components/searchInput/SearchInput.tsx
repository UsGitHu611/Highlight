import type {FC} from "react";
import type {SearchInputProps} from "./types.ts";
import styles from "./styles.module.css"

export const SearchInput:FC<SearchInputProps> = ({...props}) => {
    return (
        <input
            className={styles.input}
            type="search"
            {...props}
        />
    )
}