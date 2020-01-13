import { Component } from 'react'

export default class ErrorBoundary extends Component {

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        if(this.state.hasError) {
            console.log("errorrrrrrrrrrrr")
        }
        return this.props.children;
    }
}