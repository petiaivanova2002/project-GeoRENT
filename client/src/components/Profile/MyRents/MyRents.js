import Tool from '../../ToolsCatalog/Tool/Tool';
import styles from './MyRents.module.css'
import { AuthContext } from '../../../contexts/AuthContext';
import { useState, useContext } from 'react';
// import * as toolService from '../../services/toolsService'


export default function MyRents() {
    // const [myTools, setMyTools] = useState([])
    const { myRents, userId } = useContext(AuthContext);
    // console.log(tools);


    // const [selectedCategory, setSelectedCategory] = useState();

    // useEffect(() => {
    //     toolService.getByOwner(userId, token)
    //         .then(result => {
    //             // console.log(result)
    //             setMyTools(result)
    //         })
    // }, [userId])

    const userTools = myRents.filter(x => x.rented === userId);

    return (
        <>
            <section className={styles["catalog"]} id="catalog">
            <h3>My rents</h3>
                <div className={styles["container"]}>

                    {(userTools.length === 0) && (
                        <h2 className={styles["no-tool"]}>There are no my rents yet...</h2>
                    )};

                    {(userTools.length !== 0) && (myRents.map(tool => <Tool
                        {...tool}
                    />))}
                </div>
            </section>
        </>
    )
}