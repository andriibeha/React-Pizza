import { useState, useEffect, useContext} from "react";
import { SearchContext } from "components/App";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "components/Pagination";

const Home = () => {
    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [curentPage, setCurentPage] = useState(1);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "популярности",
        sortProperty: "rating"
    });

    useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortBy = sortType.sortProperty;
        const search = searchValue ? `search=${searchValue}` : "";

        
        fetch(`https://6304b2f794b8c58fd7231db1.mockapi.io/api/items?page=${curentPage}&limit=6&${category}&${search}&sortBy=${sortBy}&order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
        
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, curentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                    onChangeCategory={(id) => setCategoryId(id)} />
                <Sort value={sortType}
                    onChangeSort={(id) => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={number => setCurentPage(number)} /> 
        </div>
    )
};

export default  Home;
