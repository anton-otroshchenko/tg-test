import '@xelene/tgui/dist/styles.css';
import './index.css';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux'
import { store } from './store/store'

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
