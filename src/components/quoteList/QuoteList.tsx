import type { QuoteListProps } from "./types.ts"
import type {FC} from "react";
import styles from "./styles.module.css"
import {QuoteItem} from "../quoteItem";

export const QuoteList: FC<QuoteListProps> = ({quoteList, ref, ...props}) => {
    return (
        <ul className={styles.list} {...props}>
            {quoteList.map(({ id, ...info }, index) => (
                <QuoteItem ref={(instate: HTMLLIElement) => {
                    if (ref?.current) {
                        ref.current[index] = instate;
                    }
                }} key={id} {...info}/>
            ))}
        </ul>
    )
}