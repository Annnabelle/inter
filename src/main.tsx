import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store/index.ts';
import App from './App.tsx'
import "./i18n.ts";
import './index.sass'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>,
)
