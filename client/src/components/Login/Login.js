import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';


export default function Login() {
    const { onLoginSubmit } = useContext(AuthContext);
    const { formValues, onChangeHandler, onSubmit } = useForm({
        email: '',
        password: ''
    }, onLoginSubmit)

    return (

        <div className={styles["create-form-container"]}>

            <form className={styles["form"]} id="login" method="POST" onSubmit={onSubmit} >

                <h3 className={styles["h2"]}>Login</h3>

                <label className={styles["label"]}>Email:</label>
                <input
                    type="text"
                    name="email"
                    className={styles["box"]} id="email"
                    placeholder='Enter your email'
                    value={formValues.email}
                    onChange={onChangeHandler}
                />

                <label className={styles["label"]}>Password:</label>
                <input
                    type="text"
                    name="password"
                    className={styles["box"]}
                    id="password"
                    placeholder='Enter your password'
                    value={formValues.password}
                    onChange={onChangeHandler}
                />


                <input type="submit" value="Login" className={styles["btn"]} />

                <p className={styles["reg"]}>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}