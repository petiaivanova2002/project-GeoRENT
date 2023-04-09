import styles from './RentedTool.module.css';
import { Link} from 'react-router-dom'
import { useState } from 'react';

export default function RentedTool({
    
    brand,
    category,
    description,
    imageUrl,
    price,
    weeklyPrice,
  
}) {  
    return (
        <div className={styles["tool"]}>
            <div className={styles["info-container"]}>
                <img src={imageUrl} alt="tool" />
                <div className="info">
                    <h3>Brand: {brand}</h3>
                    <h4>Category: {category}</h4>
                    {price && (
                    <p>Price per month: {price}</p>
                )}
                {weeklyPrice && (
                    <p>Price per week: {weeklyPrice}</p>
                )}
                <p>Description: {description}</p>
              
                </div>
            </div>

         
        </div>
    )
}