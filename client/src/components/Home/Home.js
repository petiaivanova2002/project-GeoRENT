import styles from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className={styles['home-background']}>          
                
            <h1>Geodesy tools and accessories for RENT</h1>
            <p className={styles['italic']}>You measure the Earth!</p>
            <Link to="/catalog" className={styles["rent"]}>view All tools</Link>

            <ul className={styles['add']}>
                <li>Quickly!</li>
                <li>Accurently!</li>
                <li>Correctly!</li>
            </ul>
         
        </div>
    )

}