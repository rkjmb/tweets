import { memo } from 'react'

const Header = ({ title = 'Title', children }) => {
    return (
        <header>
            <div>
                <h4>{title}</h4>
            </div>
            <div>
                {children}
            </div>
        </header>
    )
}

export default memo(Header)
