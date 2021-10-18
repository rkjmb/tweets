import Header from "../components/Header";

import Error from "../components/Error";
import Loader from "../components/Loader";

import { TagCloud } from 'react-tagcloud';

import useTrends from '../utils/hooks/useTrends';

const Trends = () => {
    const [cloudData, error, loading, shouldCallAPI, setshouldCallAPI] = useTrends({ duration: 5000 })

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error message={error} />
    }

    const handleStatusChange = () => {
        setshouldCallAPI(oldV => !oldV)
    }
    return (
        <>
            <Header title={'Trends'} >
                <button onClick={handleStatusChange}>{shouldCallAPI ? "Dont Refresh" : "Refresh"} </button>
            </Header>
            <div className='trendsWrapper'>
                <TagCloud
                    minSize={15}
                    maxSize={25}
                    tags={cloudData || []}
                    onClick={tag => console.log(`tweet count for ${tag.value} : ${tag.count} `)}
                />
            </div>
        </>
    )
}

export default Trends
