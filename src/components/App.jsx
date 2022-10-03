import {Routes,Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "pages/NotFound";
import Home from "pages/Home";
import Cart from "pages/Cart";

import "../scss/app.scss";
import { useState } from "react";


export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};
