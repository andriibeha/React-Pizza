import { useState } from "react";
import debounce from "lodash.debounce";

import s from "./Search.module.scss";  
import { useDispatch } from "react-redux";
import { setSearchValue } from "redux/slices/filterSlice";

const Search = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const onChangeInput = (e) => {
        setValue(e.target.value);
        const debounced = debounce(() => dispatch(setSearchValue(e.target.value)), 500);
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
