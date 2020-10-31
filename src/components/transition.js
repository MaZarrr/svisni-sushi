import React from "react"
import {
    TransitionGroup,
    Transition as ReactTransition,
} from "react-transition-group"
import Spinner from './spinner/spinner'

const timeout = 500
const getTransitionStyles = {
    entering: {
        position: `absolute`,
        opacity: 0,
    },
    entered: {
        transition: `opacity ${timeout}ms ease-in-out`,
        opacity: 1,
    },
    exiting: {
        transition: `opacity ${timeout}ms ease-in-out`,
        opacity: 0,
    },
}
class Transition extends React.PureComponent {
    render() {
        const { children, location } = this.props
        return (
            <TransitionGroup>
                <ReactTransition
                    key={location.pathname}
                    timeout={{
                        enter: 1000,
                        exit: 10000,
                    }}
                >
                    {status => (
                        <div
                            style={{
                                ...getTransitionStyles[status],
                            }}
                        >
                            {children}
                        </div>
                    )}
                </ReactTransition>
            </TransitionGroup>
        )
    }
}
export default Transition