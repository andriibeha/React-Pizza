import {Routes,Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "pages/NotFound";
import Home from "pages/Home";
import { Cart } from "pages/Cart";




import "../scss/app.scss";


export const App = () => {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};
