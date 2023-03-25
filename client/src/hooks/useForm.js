
import { useState } from "react";

export default function useForm(initialValues, onSubmitHandler) {
    const [formValues, setFormValues] = useState(initialValues)

    const onChangeHandler = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value })) //({})-returnva obekt, ako nqma () go byrka s funcciq
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formValues)
    };
    
    return {
        formValues,
        onChangeHandler,
        onSubmit,
    }

}