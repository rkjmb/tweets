import { lazy } from 'react'

const Feed = lazy(() => import('../pages/TweetFeed'))
const Trends = lazy(() => import('../pages/Trends'))
const NotFound = lazy(() => import('../pages/NotFound'))

export { Feed, Trends, NotFound }
