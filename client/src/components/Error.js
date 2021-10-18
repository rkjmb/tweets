const Error = ({ message = 'Something went wrong' }) => {
    return <div className='emptyWrapper error'>
        <h5>{message}</h5>
    </div>
}

export default Error
