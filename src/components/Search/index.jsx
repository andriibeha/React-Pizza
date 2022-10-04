import { useContext, useState, useCallback } from "react";
import { SearchContext } from "components/App";
import debounce from "lodash.debounce";

import s from "./Search.module.scss";  

const Search = () => {
    const [value, setValue] = useState('');
    const { setSearchValue } = useContext(SearchContext);

    const updateSearchValue = useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 500),
        []
    );

    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    return (
        <input
            value={value}
            onChange={(e) => {onChangeInput(e)}}
            className={s.root} placeholder="Поиск пиццы" />
    )
};

export default Search;
