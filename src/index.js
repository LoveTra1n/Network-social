import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import store from "./redux/redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "./redux/redux";
import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={"...loading"} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </ChakraProvider>
);

reportWebVitals()
