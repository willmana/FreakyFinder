import React, { useState } from 'react';
import { MessageProvider } from '@messageformat/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './utils/configureStore';
import texts from './texts/textData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const store = configureStore({});
const deriveInitialLocale = () => {
    const localeFromStorage = window.localStorage.getItem('locale');
    if (Object.keys(texts).includes(localeFromStorage)) {
        return localeFromStorage;
    } else {
        return 'fi';
    }
};
const initialLocale = deriveInitialLocale();

const ProviderWrapper = () => {
    const [locale, setLocale] = useState(initialLocale);
    const onChangeLocale = (newLocale) => {
        if (Object.keys(texts).includes(newLocale)) {
            setLocale(newLocale);
            window.localStorage.setItem('locale', newLocale);
        }
    };

    return (
        <Provider store={store}>
            <BrowserRouter>
                <MessageProvider messages={texts[locale]} locale={locale}>
                    <Routes>
                        <Route
                            path="*"
                            element={<App onChangeLocale={onChangeLocale} />}
                        />
                    </Routes>
                </MessageProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default ProviderWrapper;
