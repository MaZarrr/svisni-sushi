import React, {Component} from 'react'
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";


class ErrorBoundary extends Component {
    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({hasError: true})
    }

    reload = () => window.location.reload();

    render() {
        const { hasError } = this.state

        if(hasError) {
            return (
                <div style={{ display: `flex`, flexDirection: `column`, height: `100vh`}}>
                    <div style={{margin: `auto`}}>
                        <Typography variant={`h5`}>Обновления на сайте!</Typography>
                        <Button fullWidth={true} style={{ margin: `8px 0 8px 0` }} variant="contained" color={"secondary"} onClick={this.reload}>
                            Обновить
                        </Button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary