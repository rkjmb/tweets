import { useState, useEffect, useCallback } from 'react'

const useTrends = ({ duration = 5000 }) => {
    const [cloudData, setCloudData] = useState([])
    const [error, seterror] = useState("")
    const [loading, setloading] = useState(true)
    const [shouldCallAPI, setshouldCallAPI] = useState(false)

    const fetchTrends = useCallback(() => {
        fetch('http://localhost:5000/api/trends?id=20070458')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('No results found');
                }
            })
            .then(data => {
                if (data && Object.keys(data).length) {
                    setCloudData(data.body[0].trends.map(d => ({ value: d.name, count: d.tweet_volume })))
                    setshouldCallAPI(true)
                }
            })
            .catch((e) => {
                seterror(e.message || "Trends API failed")
                setshouldCallAPI(false)
            })
            .finally(() => {
                setloading(false)
            })
    }, [])

    useEffect(() => {
        fetchTrends()
    }, [fetchTrends])

    useEffect(() => {
        let id;
        if (shouldCallAPI) {
            id = setInterval(() => {
                fetchTrends()
            }, duration)
        }
        return () => { if (id) clearTimeout(id) }
    }, [shouldCallAPI, duration, fetchTrends])

    return [cloudData, error, loading, shouldCallAPI, setshouldCallAPI]
}

export default useTrends
