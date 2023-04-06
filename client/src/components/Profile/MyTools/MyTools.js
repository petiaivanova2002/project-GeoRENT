import Tool from '../../ToolsCatalog/Tool/Tool';
import styles from './MyTools.module.css'
import { AuthContext } from '../../../contexts/AuthContext';
import { useState,useEffect, useContext } from 'react';
import * as toolService from '../../../services/toolsService'


export default function MyTools({
    tools,
   
}) {
    const [myTools, setMyTools] = useState([])
    const { userId } = useContext(AuthContext);
   
    console.log(tools)

    useEffect(() => {
        toolService.getAll()
            .then(result => {
                // console.log(result)
                setMyTools(Object.values(result));
            })
    }, [])

    const userTools = myTools.filter(x => x._ownerId === userId);



    return (
        <>
            <section className={styles["catalog"]} id="catalog">
                    <h3>My tools</h3>
                <div className={styles["container"]}>

                    {(userTools.length === 0) && (
                        <h2 className={styles["no-tool"]}>There are no my tools for rent yet...</h2>
                    )};

                    {(userTools.length !== 0) && (userTools.map(tool => <Tool
                        {...tool}
                        key={tool._id}
                    />))}
                </div>
            </section>
        </>
    )
}