# Пример `Highlight API` в React #
### 1. Для начала нам нужно получить текстовую ноду из основной ###
```tsx
import {type FC, type HTMLAttributes, useEffect, useRef} from "react";

export const TextNode: FC<HTMLAttributes<HTMLParagraphElement>> = (props) => {
    const ref = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const textNode = ref.current?.childNodes[0]; // <- текстовая нода
        // ...
    }, [])

    return <p ref={ref} {...props}>Hello</p>
}
```
### 2. Создаем экземпляр класса `new Range()` ###
```tsx
//...
useEffect(() => {
    const textNode = ref.current?.childNodes[0] as Text;
    const text = textNode.data; // <- строка из ноды
    
    const range = new Range(); // создаем range
    // задаем начало и конец выделения
    range.setStart(textNode, 1);
    range.setEnd(textNode, text.length - 3);
}, [])
```
### 3. Создаем экземпляр класса `new Highlight()` ###
```tsx
useEffect(() => {
    // ...
    const range = new Range();
    range.setStart(textNode, 1);
    range.setEnd(textNode, text.length - 3);
    
    const highlight = new Highlight(range); // <- кладем туда свой range
}, [])
```
### 4. Устанавливаем уникальный идентификатор для псевдокласса в css `::highlight(...)` ###
```tsx
useEffect(() => {
    // ...
    const highlight = new Highlight(range);
    CSS.highlights.set("highlight", highlight);
}, [])
```
```css
/*highlight - идентификатор псевдокласса*/
::highlight(highlight) { 
    background-color: #ae4859;
    color: white;
}
```
### Итоговый код ###
```tsx
import {type FC, type HTMLAttributes, useEffect, useRef} from "react";
import styles from "./style.module.css"

export const TextNode: FC<HTMLAttributes<HTMLParagraphElement>> = (props) => {
    const ref = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        /*setTimeout для искуственной задержки, ибо при первой отрисовке
        не будет выделен текст
        * */
        setTimeout(() => {
            const textNode = ref.current?.childNodes[0] as Text;
            const text = textNode.data;

            const range = new Range();
            range.setStart(textNode, 1);
            range.setEnd(textNode, text.length);

            const highlight = new Highlight(range);
            CSS.highlights.set("highlight", highlight);
        })
    }, [])

    return <p ref={ref} {...props}>Hello</p>
}
```
```css
::highlight(highlight) { 
    background-color: #ae4859;
    color: white;
}
```

[Ссылка на статью](https://tproger.ru/articles/css-custom-highlight-api)
