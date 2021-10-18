import ReactDOM from "react-dom";
import App from "./pages/App";
import './index.css'


import { SocketContextProvider } from './context/socket'
import { StreamContextProvider } from './context/stream'

ReactDOM.render(
    <SocketContextProvider>
        <StreamContextProvider>
            <App />
        </StreamContextProvider>
    </SocketContextProvider>,
    document.querySelector("#root"));