import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import commonStore from "./stores/commonStore.js";
import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <Provider commonStore={commonStore}>
        <CssBaseline>
            <App/>
        </CssBaseline>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
