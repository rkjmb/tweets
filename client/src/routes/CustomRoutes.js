import { Route } from 'react-router-dom'
import ErrorBoundary from '../utils/ErrorBoundary'
import NotFound from '../pages/NotFound'

const ErrorBoundaryRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                <ErrorBoundary>
                    <Component {...props} />
                </ErrorBoundary>
            }
        />
    )
}

const PrivateRoute = ({
    component: Component,
    permission: name,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                true ? (
                    <ErrorBoundary>
                        <Component {...props} />
                    </ErrorBoundary>
                ) : (
                    <NotFound />
                )
            }
        />
    )
}

export { ErrorBoundaryRoute, PrivateRoute }
