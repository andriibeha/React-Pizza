import s from "./Search.module.scss";

const Search = ({searchValue, setSearchValue}) => {
    return (
        <input
            value={searchValue}
        onChange={(e) => {setSearchValue(e.target.value)}}
        className={s.root} placeholder="Поиск пиццы" />
    )
};

export default Search;
