import { Link } from "react-router-dom";
import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles["not-found"]}>
            <h1>404 ...not found!</h1>
            <p>The page you are looking for doesn't exist. Go to <Link to="/" className={styles["btn"]}>HOME</Link></p>
        </div>


    )
}