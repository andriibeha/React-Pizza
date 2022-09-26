import Header from "./Header";
import Categories from "./Categories";
import Sort from "./Sort";
import PizzaBlock from "./PizzaBlock";
import "../scss/app.scss";

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
            <PizzaBlock title="Мексиканская" price="500" />
            <PizzaBlock title="Четыре сыра" price="350" />
            <PizzaBlock title="Сырная" price="750" />
            <PizzaBlock title="Веганская" price="550" />
          </div>
        </div>
      </div>
    </div>
  );
};
