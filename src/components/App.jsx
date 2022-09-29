import { useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import Sort from "./Sort";
import PizzaBlock from "./PizzaBlock";

import "../scss/app.scss";
import { useEffect } from "react";


export const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://6304b2f794b8c58fd7231db1.mockapi.io/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
