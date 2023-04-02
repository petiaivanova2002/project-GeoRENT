import Tool from '../Tool/Tool';
import styles from './CategoryItems.module.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as toolService from '../../../services/toolsService'

export default function CategoryItems({
    tools,
    onDetailsTool,
}) {
    const categoryProducts = {
        lasers:'Laser scanning systems',
        gps: 'GPS receivers',
        drones: 'Drones',
        totals: 'Total stations',
        levels: 'Digital levels',
        accessories: 'Accessories',
    }
    const { categoryItems } = useParams();
    // const [selectedCategory, setSelectedCategory] = useState();

    // useEffect(() => {
    //     toolService.getByCategory(categoryItems)
    //     .then(result => {
    //         // console.log(result)
    //         setSelectedCategory(result)
    //     })

        
    // },[categoryItems])
    
    const selectedCategory = tools.filter(x => x.category.toLowerCase() === categoryProducts[categoryItems].toLowerCase());      
    // setSelectedCategory(selection)
    console.log(categoryItems);
    // console.log(selectedCategory);

    // console.log(categoryProducts[categoryItems])

    return (
        <>
            <section className={styles["catalog"]} id="catalog">
                <h3>{categoryProducts[categoryItems]}</h3>
                <div className={styles["container"]}>
                    {selectedCategory.map(tool => <Tool
                        {...tool}
                        key={tool._id}                       
                    />)}
                    {tools.length === 0 && (
                        <h2 className={styles["no-tool"]}>There are no tool for rent yet...</h2>
                    )};

                </div>
            </section>
        </>
    )
}