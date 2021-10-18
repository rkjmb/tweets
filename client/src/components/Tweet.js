import Moment from 'react-moment';

const Tweet = ({ tweet, user }) => {
    const { created_at, text } = tweet;
    const { profile_image_url, username } = user;
    return (
        <div className='tweet'>
            <div className='picture'>
                <img key={profile_image_url} className='avatar' src={profile_image_url} alt={username} />
            </div>
            <p className='text' >{text}</p>
            <span className='author'>
                @{username}
            </span>
            <span className='date' >
                <Moment format="MM/dd/yyyy HH:mm:ss">{created_at}</Moment>
            </span>

        </div>
    )
}

export default Tweet
