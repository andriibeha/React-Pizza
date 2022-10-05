import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from 'react-redux'
import { App } from 'components/App';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/React-Pizza">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
