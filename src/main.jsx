import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux'; // Corrected to uppercase 'Provider'
import store from './redux/Store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Corrected here */}
      <App />
    </Provider>
  </StrictMode>
);




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {provider} from 'react-redux';
// import store from './store';



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//   <provider store={store}>
//   <App/>
//   </provider>
//  </StrictMode>,
// )
