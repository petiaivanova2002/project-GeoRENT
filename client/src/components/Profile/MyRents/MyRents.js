import RentedTool from '../../RentedTool/RentedTool';
import styles from './MyRents.module.css'
import { AuthContext } from '../../../contexts/AuthContext';
import { useState, useEffect, useContext } from 'react';

export default function MyRents() {

    const { userId, myRents } = useContext(AuthContext);

    // const [selectedCategory, setSelectedCategory] = useState();

    // useEffect(() => {
    //     toolService.getAll()
    //         .then(result => {
    //             // console.log(result)
    //             setMyRentedTools(result)
    //         })
    // }, [])

    // const getRented = async (toolId) => {
    //     const myRented = toolService.getOne(toolId)
    //     setMyRentedTools(myRented)
    // }



    const rentedTools = myRents.filter(x => x.rented === userId);

    return (
        <>
            <section className={styles["catalog"]} id="catalog">
            <h3>My rents</h3>
                <div className={styles["container"]}>

                    {(rentedTools.length === 0) && (
                        <h2 className={styles["no-tool"]}>There are no my rents yet...</h2>
                    )};

                    {rentedTools && (rentedTools.map(tool => <RentedTool
                        {...tool}
                        key={tool._id}
                    />))}
                </div>
            </section>
        </>
    )
}