import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore';
import register from './registerServiceWorker';

const store = configureStore();
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        let reg = navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful

            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });

    });
}

render(
    <Provider store={store}>
        <App/>
    </Provider>
        , document.getElementById('root')
);
