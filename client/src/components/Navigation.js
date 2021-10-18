

import { NavLink } from 'react-router-dom'

import logo from '../assets/logo.png'

const navConfig = [
    {
        id: 1,
        to: '/',
        pathName: 'Tweets',
        icon: ""
    },
    {
        id: 2,
        to: '/trends',
        pathName: 'Trends',
        icon: ""
    }
]

const Navigation = () => {
    return (
        <div className="navigation">
            <div>
                <img src={logo} className={'logo'} alt='logo' />
            </div>
            {navConfig.map(link => <NavLink
                key={link.id}
                exact
                to={link.to}
                className='navItem'
                activeClassName='activeNavItem'
            >
                <span>{link.pathName}</span>
            </NavLink>)}
        </div>
    )
}

export default Navigation
