

import Tweet from "../components/Tweet";
import Header from "../components/Header";

import Error from "../components/Error";
import Loader from "../components/Loader";

import useStream from "../utils/hooks/useStream";

const TweetFeed = () => {
    const [tweets, status, setstatus, loading, error] = useStream({ tweetsCount: 20 })

    const handleStatus = () => {
        setstatus(oldStatus => !oldStatus)
    }

    if (loading && error) {
        return <Loader withText={error} />
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error message={error} />
    }

    return (
        <>
            <Header title={'Tweets'}>
                {tweets.length ? <button onClick={handleStatus}>{status ? "Pause" : "Play"} stream</button> : <></>}
            </Header>
            <div className='tweetsWrapper'>
                {tweets.map(({ data, includes }, index) => <Tweet key={index} tweet={data} user={includes.users[0]} />)}
            </div>
        </>
    )
}

export default TweetFeed
