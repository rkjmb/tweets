import { useEffect, useContext, Suspense } from 'react'
import { Router } from 'react-router-dom'
import history from '../routes/history'
import Routes from '../routes/Routes'

import Navigation from '../components/Navigation'
import Loader from '../components/Loader'

import socketIo from "socket.io-client";
import { SocketContext } from '../context/socket'

import './App.css';

const App = () => {
    const { setsocket } = useContext(SocketContext);

    useEffect(() => {
        const socket = socketIo("http://localhost:5000");
        setsocket(socket);
        return () => {
            setsocket(null)
        }
    }, [setsocket])

    return (
        <div className='app'>
            <Router history={history}>
                <Navigation />
                <main>
                    <Suspense fallback={<Loader />}>
                        <Routes />
                    </Suspense>
                </main>
            </Router>
        </div >
    )
}

export default App