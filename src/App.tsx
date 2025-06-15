import {QuoteList} from "./components/quoteList";
import {quotes} from "./data.ts";
import {useHighlight} from "./hooks/useHighlight.ts";
import {SearchInput} from "./components/searchInput";

export default function App() {
    const { searchItemsRef, value, onChangeValue } = useHighlight();

    return (
        <div className='App'>
            <SearchInput
                value={value}
                onChange={onChangeValue}
            />
            <QuoteList ref={searchItemsRef} quoteList={quotes}/>
        </div>
    )
}
