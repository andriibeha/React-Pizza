import { useContext, useState } from "react";
import { SearchContext } from "components/App";
import debounce from "lodash.debounce";

import s from "./Search.module.scss";  

const Search = () => {
    const [value, setValue] = useState('');
    const { setSearchValue } = useContext(SearchContext);

    const onChangeInput = (e) => {
        setValue(e.target.value);
        const debounced = debounce(() => setSearchValue(e.target.value), 500);
        debounced();
    };

    return (
        <input
            value={value}
            onChange={(e) => {onChangeInput(e)}}
            className={s.root} placeholder="Поиск пиццы" />
    )
};

export default Search;
