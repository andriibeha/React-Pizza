import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useRef } from "react";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";
import { SearchPizzaParams } from "../redux/slices/pizzasSlice";


const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);


    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [dispatch]);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
            const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
            dispatch(setFilters({
                searchValue: params.search,
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                sort: sort || sortList[0],
            }));
        };

        isSearch.current = true;
    }, [dispatch]);

    useEffect(() => {
        const getPizzas = () => {
            const category = categoryId > 0 ? `category=${categoryId}` : "";
            const sortBy = sort.sortProperty;
            const search = searchValue ? `search=${searchValue}` : "";

            dispatch(fetchPizzas({
                sortBy,
                category,
                search,
                currentPage: String(currentPage),
            }));
        };

        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage, dispatch]);

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


    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}
                    onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ?
                <div className="content__error-info">
                    <h2>Ошибка 😕</h2>
                    <p>Не удалось получить пиццы. Попробуйте повторить попитку позже</p>
                </div>
                :
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
};

export default Home;
