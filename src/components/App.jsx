import Header from "./Header";
import Categories from "./Categories";
import Sort from "./Sort";
import PizzaBlock from "./PizzaBlock";
import "../scss/app.scss";

import pizzas from "../assets/pizzas.json";


export const App = () => {
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
              pizzas.map((obj) => (
                <PizzaBlock key={obj.id} {...obj}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
