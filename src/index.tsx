import '@xelene/tgui/dist/styles.css';
import './index.css';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

axios.defaults.headers.common['Authorization'] = `tma ${window.Telegram?.WebApp.initData}`;
axios.defaults.baseURL = '/api';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
