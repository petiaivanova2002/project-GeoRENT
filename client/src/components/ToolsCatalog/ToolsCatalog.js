import Tool from './Tool/Tool';
import styles from './ToolsCatalog.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function ToolsCatalog({
 
    onDetailsTool,
}) {

    const { tools } = useContext(AuthContext);
 
    console.log(tools)
    console.log(tools.length)
    return (
        <>
            <section className={styles["catalog"]} id="catalog">
                <h2>Tools for your daily work!</h2>
                <div className={styles["container"]}>
                    {tools.length === 0 && (

                        <h2 className={styles["no-tool"]}>There are no tools for rent yet...</h2>
                    )}
                    {tools.length !== 0 && tools.map(tool => <Tool
                        {...tool}
                        key={tool._id}
                        onDetailsTool={onDetailsTool}
                    />)}


                </div>
            </section>
        </>
    )
}