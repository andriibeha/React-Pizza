import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "components/App";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "components/Pagination";

import { setCategoryId, setCurrentPage, setFilters } from "redux/slices/filterSlice";
import { useRef } from "react";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
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
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(setFilters({ ...params, sort }));
        };

        isSearch.current = true;
    }, [dispatch]);


    useEffect(() => {
        window.scrollTo(0, 0);

        if (isSearch.current) {
            setIsLoading(true);

            const category = categoryId > 0 ? `category=${categoryId}` : "";
            const sortBy = sort.sortProperty;
            const search = searchValue ? `search=${searchValue}` : "";
        
            axios.get(`https://6304b2f794b8c58fd7231db1.mockapi.io/api/items?page=${currentPage}&limit=6&${category}&${search}&sortBy=${sortBy}&order=desc`)
                .then((res) => {
                    setItems(res.data);
                    setIsLoading(false);
                });
        };

        isSearch.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    useEffect(() => {
        if (isMounted.current) { 
            const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        });

        navigate(`?${queryString}`);
        };

        isMounted.current = true;
    }, [currentPage, categoryId, sort.sortProperty, navigate]);


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
