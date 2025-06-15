import {type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";


export const useHighlight = () => {
    const searchItemsRef = useRef<HTMLLIElement[]>([]);
    const matchesCache = useRef<Map<string, Range[]>>(new Map());
    const [value, setValue] = useState<string>('');

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const findAllMatches = useCallback((text: Text, searchText: string) => {
        if (!searchText) return [];

        const cacheKey = `${text.data}-${searchText}`;

        if (matchesCache.current.has(cacheKey)) {
            return matchesCache.current.get(cacheKey)!;
        }

        const result = [];
        let startPosition = 0;
        let index;

        while ((index = text.data.toLowerCase().indexOf(searchText, startPosition)) !== -1) {
            result.push(index);
            startPosition = index + searchText.length;
        }

        const ranges = result.map(index => {
            const range: Range = new Range();
            range.setStart(text, index);
            range.setEnd(text, index + searchText.length);
            return range;
        })

        matchesCache.current.set(cacheKey, ranges);
        return ranges;
    }, [])

    useEffect(() => {
        const highlight = new Highlight();
        CSS.highlights.clear();

        searchItemsRef.current.forEach((li) => {
            const textNode = li.childNodes[0].childNodes[0] as Text;
            const findString = value.toLowerCase().trim();
            const allMatches = findAllMatches(textNode, findString);

            allMatches.forEach((range) => highlight.add(range));
        })
        CSS.highlights.set("highlight", highlight);

        return () => {
            CSS.highlights.clear();
        };
    }, [value]);

    return useMemo(() => ({
        searchItemsRef,
        value,
        onChangeValue
    }), [value, onChangeValue])
}