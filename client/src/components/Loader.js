import React from 'react'

const Loader = ({ withText }) => {
    return (
        <div className='emptyWrapper'>
            {withText && <h5>{withText}</h5>}
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader
