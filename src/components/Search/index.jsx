import { useContext } from "react";
import { SearchContext } from "components/App";

import s from "./Search.module.scss";

const Search = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);

    return (
        <input
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value)}}
            className={s.root} placeholder="Поиск пиццы" />
    )
};

export default Search;
