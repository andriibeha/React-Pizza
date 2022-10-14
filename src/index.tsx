import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from 'react-redux'
import { App } from './components/App';

const rootElem = document.getElementById('root');

if (rootElem) { 
  ReactDOM.createRoot(rootElem).render(
  <BrowserRouter basename="/React-Pizza">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
};

