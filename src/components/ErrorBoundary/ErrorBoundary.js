import React, {Component} from 'react'
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";


class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    componentDidCatch() {
            this.setState({hasError: true})
    }

    reload = () => window.location.reload()

    render() {
        const {hasError} = this.state

        if(hasError) {
            return (
                    <div className="d-flex flex-column items-center" >
                        <div style={{margin: `20% auto 0 auto`}}>
                            <Typography variant={`h5`}>Упс! Непредвиденная ошибка. Возможна проблема с интернетом...</Typography>
                            <Button style={{margin: `8px 0 8px 0 `}} variant="contained" color="primary" onClick={this.reload}>
                                Оффлай версия
                            </Button>
                        </div>
                    </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary