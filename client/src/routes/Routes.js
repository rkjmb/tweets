import { Route, Switch, Redirect } from 'react-router-dom'

import { Feed, Trends, NotFound } from '../utils/lazyLoaded'
import { ErrorBoundaryRoute } from './CustomRoutes';

const Routes = () => {
    return (
        <Switch>
            <ErrorBoundaryRoute exact path="/" component={Feed} />
            <ErrorBoundaryRoute exact path="/trends" component={Trends} />
            <Route path="/notfound" component={NotFound} />
            <Redirect to="/notfound" />
        </Switch>
    )
}

export default Routes
