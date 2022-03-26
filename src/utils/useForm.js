import { useState } from "react"

const useForm = (submitCallback, defaultValues, mode) => {
    const [state, setState] = useState({})
    console.log("state useForm", state);

    const handleSubmit = e => {
        e.preventDefault()
        submitCallback()
    }

    const clearValueForm = () => {
        setState({})
    }

    const handleChange = e => {
        e.persist();
        setState(state => ({...state, [e.target.name]: e.target.value}));
    }

    return [state, handleChange, handleSubmit, clearValueForm];
}

export default useForm;