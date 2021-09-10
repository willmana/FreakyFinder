import { MessageProvider } from '@messageformat/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './utils/configureStore';
import texts from './texts/textData';

const store = configureStore({});
// Add locales later but continue development with 2 languages in mind
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MessageProvider messages={texts['fi']} locale={'fi'}>
                <App />
            </MessageProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
