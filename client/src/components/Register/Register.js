import styles from './Register.module.css'

import { useContext } from 'react';
import useForm from '../../hooks/useForm';

import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'


export default function Register({
    formErrors,
    formValidate,
}){
    const {onRegisterSubmit} = useContext(AuthContext);
    const {formValues, onChangeHandler, onSubmit} = useForm({
        email: '',
        password: '',
        repeatPassword: ''
    }, onRegisterSubmit)

    return (

        <div className={styles["create-form-container"]}>

            <form className={styles["form"]} method="POST" onSubmit = {onSubmit}>

                <h3 className={styles["h2"]}>Register</h3>

                <label className={styles["label"]}>Email:</label>
                <input 
                type="email" 
                name="email" 
                className={styles["box"]} 
                id="email" 
                placeholder='Enter your email'
                value={formValues.email}
                onChange = {onChangeHandler}
                onBlur={formValidate} />
                {formErrors.email && <p className={styles["error"]}>{formErrors.email}</p>}

                <label className={styles["label"]}>Password:</label>
                <input 
                type="text" 
                name="password" 
                className={styles["box"]} 
                id="password" 
                placeholder='Enter your password'
                value = {formValues.password} 
                onChange= {onChangeHandler}
                onBlur={formValidate}/>
                {formErrors.password && <p className={styles["error"]}>{formErrors.password}</p>}

                <label className={styles["label"]}>Repeat password:</label>
                <input 
                type="text" 
                name="repeatPassword" 
                className={styles["box"]} 
                id="repeatPassword" 
                placeholder='Repeat password'
                value={formValues.repeatPassword}
                onChange={onChangeHandler} 
                onBlur={formValidate}/>
                {formValues.password !== formValues.repeatPassword && <p className={styles["error"]}>{formErrors.repeatPassword}</p>}


                <input type="submit" value="Register" className={styles["btn"]} />

                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    )
}