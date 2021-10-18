import { useState, useEffect, useContext } from 'react'


import { SocketContext } from '../../context/socket';
import { StreamContext } from '../../context/stream';

const useStream = ({ tweetsCount = 20 }) => {
    const { socket } = useContext(SocketContext);
    const { stream, setStreamParams } = useContext(StreamContext);
    const [tweets, settweets] = useState([])
    const [status, setstatus] = useState(true)

    const { loading, error } = stream;

    useEffect(() => {
        if (socket) {
            if (status) {
                socket.on('connect', (message) => {
                    console.log("Connected to server")
                    setStreamParams(old => ({ ...old, error: "", loading: true }))
                    // seterror("")
                    // setloading(true)
                })
                socket.on('tweet', (tweet) => {
                    settweets(oldTweets => [tweet, ...oldTweets.slice(0, tweetsCount)])
                    setStreamParams(old => ({ ...old, loading: false }))
                })
                socket.on('authError', (value) => {
                    setStreamParams(old => ({ ...old, error: "Not Authorized", loading: false }))
                })
                socket.on('error', (value) => {
                    setStreamParams(old => ({ ...old, loading: false }))
                })
                socket.on('retrying', (value) => {
                    if (value && Object.keys(value).length) {
                        setStreamParams(old => ({ ...old, error: "Maximum limit reached. Waiting for re-connection", loading: true }))
                    }
                })
            } else {
                if (socket) {
                    socket.removeAllListeners();
                }
                setStreamParams(old => ({ ...old, loading: false }))
            }
        }
    }, [socket, status, tweetsCount, setStreamParams])

    return [tweets, status, setstatus, loading, error]
}

export default useStream
