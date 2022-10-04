import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "components/App";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "components/Pagination";

import { setCategoryId, setCurrentPage } from "redux/slices/filterSlice";




const Home = () => {
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    };

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num)); 
    };

    useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sortBy = sort.sortProperty;
        const search = searchValue ? `search=${searchValue}` : "";
        
        axios.get(`https://6304b2f794b8c58fd7231db1.mockapi.io/api/items?page=${currentPage}&limit=6&${category}&${search}&sortBy=${sortBy}&order=desc`)
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });

        
        window.scrollTo(0, 0);
    }, [categoryId, sort, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                    onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} /> 
        </div>
    )
};

export default  Home;
