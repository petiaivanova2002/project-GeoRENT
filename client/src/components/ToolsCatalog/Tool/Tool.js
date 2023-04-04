import styles from './Tool.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import * as userService from '../../../services/userService'
export default function Tool({
    _id,
    brand,
    category,
    description,
    imageUrl,
    pricePerMounth,
    onDetailsTool,
    // _ownerId,
   
}) {
    // const [toolOwner, setToolOwner] = useState(null);

    // const getToolOwner = async(ownerId) => {
    //     const owner = await userService.getOne(_ownerId)
    //     setToolOwner(owner)
    //  }
    return (
        <div className={styles["tool"]}>
            <div className={styles["info-container"]}>
                <img src={imageUrl} alt ="tool"/>
                <div className="info">
                    <h3>Brand: {brand}</h3>
                    <h4>Category: {category}</h4>
                    {/* <h3>Description: {description}</h3>
                    <h3>Price per month: {pricePerMonth}</h3> */}


                </div>
            </div>
            
            <button type='button' className={styles["details-btn"]} >
                <Link to={`/details/${_id}`} className={styles["details"]} onSubmit={() => onDetailsTool(_id)}>Details</Link>
            </button>
                
      
            </div>
    )
}