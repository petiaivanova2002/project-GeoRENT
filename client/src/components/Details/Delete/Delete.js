import styles from './Delete.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as toolsService from '../../../services/toolsService'

export default function Delete({
    // selectedTool,  
    onToolDelete,
}) {
    const {toolId} = useParams();
    const [tool, setTool] = useState({});

    // console.log(selectedTool)

    useEffect(() => {

        toolsService.getOne(toolId)

            .then((result) => {
                console.log(result)
                setTool(result)
            });
    }, [toolId]);
    
    return (
        <div className={styles["header"]}>
            <header>
                <h3>{`Are you sure you want to delete "${tool.category}"`}?</h3>
            </header>

            <div className={styles["buttons"]}>

                <Link to={'/catalog'} className={styles["btn-delete"]} onClick={() => onToolDelete(toolId)}>Delete</Link>
                <Link to={`/details/${toolId}`} className={styles["btn-close"]} >Cancel</Link>

            </div>
        </div>

    )
}