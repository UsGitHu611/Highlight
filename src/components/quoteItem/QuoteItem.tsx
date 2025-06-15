import type {QuoteItemProps} from "./types.ts"
import type {FC} from "react";
import styles from "./styles.module.css"

export const QuoteItem: FC<QuoteItemProps> = ({ body, author, ref, ...props }) => {
    return (
        <li className={styles.item} {...props} ref={ref}>
            <blockquote className={styles.quote} cite="https://pikabu.ru/story/yeffektnyie_i_silnyie_tsitatyi_iz_anime_naruto_9239045">
                { body }
                <span className={styles.author}>{author}</span>
            </blockquote>
        </li>
    )
}