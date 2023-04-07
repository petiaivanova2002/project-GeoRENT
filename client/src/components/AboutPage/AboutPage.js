import styles from './AboutPage.module.css'
export default function AboutPage() {

    return (
        <div>
            <h1 className={styles["about"]}>About</h1>
            <p className={styles["text"]}>
                We offer surveying equipment for rent for your daily work in the field of cadastre, regulation, construction, photogrammetry, design, etc.
                All instruments have a certificate of inspection and repair for the current year. If necessary, the owner provides training.
                50% of the amount is paid in advance and 50% after the end of the rental period.
                In case of damage, the user is obliged to pay the amount for the repair after a qualified assessment.
            </p>

            <h4 className={"fontWeight: bold"}>GeoRent</h4>
            <ul className={styles["contacts"]}>

                <li>Address:</li>
                <li>Etropole</li>
                <li>Dandevil street, 34</li>
                <li>+359 888111111</li>
                <li>+359 888222222</li>

            </ul>

        </div>
    )
}