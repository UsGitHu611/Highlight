import {type ChangeEvent, useEffect, useRef, useState} from "react";

export const useHighlight = () => {
    const searchItemsRef = useRef<HTMLLIElement[]>([]);
    const [ value, setValue ] = useState<string>('');

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const highlight = new Highlight();

        searchItemsRef.current.forEach((li) => {
            const textNode = li.childNodes[0].childNodes[0] as Text;
            const range: Range = new Range();
            const findString = value.toLowerCase().trim();
            const start = textNode.data.indexOf(findString);
            const end = start + value.length;

            highlight.add(range);
            CSS.highlights.set("highlight", highlight);

            if (start >=0 && end >= 0){
                range.setStart(textNode, start);
                range.setEnd(textNode, end);
            }
        })
    }, [value])
    return {
        searchItemsRef,
        value,
        onChangeValue
    }
}