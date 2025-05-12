import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

ReactDOM.createRoot(container).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
