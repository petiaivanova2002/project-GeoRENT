import styles from './Details.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as toolsService from '../../services/toolsService';
import * as rentService from '../../services/rentService';

import { AuthContext } from '../../contexts/AuthContext';

export default function Details({
    author,    

}) {
    const { toolId } = useParams();
    const [tool, setTool] = useState({});

    const { isAuthenticated, userId, onToolRent, myRents, tools } = useContext(AuthContext);

    useEffect(() => {
        
            toolsService.getOne(toolId)

                .then((result) => {
                    console.log(result)
                    setTool(result)
                });
    }, [toolId]);

    // console.log(tool.author)
    //   const author = tool.author

    //     const ownerInfo = async ( ownerId, token) => {
    // const response = await fetch(`"http://localhost:3030/users"/${ownerId}`,{
    //     headers: {
    //         'X-Authorization': token
    //     }
    // })
    //         // const result = await userService.getOwner( tool._ownerId, token);
    //         const result = await response.json();

    //         setOwner(result)
    //     }
    console.log(typeof myRents);
    console.log(myRents)
    const isRented = myRents.find(x => x._id === toolId);
    console.log(isRented);
    // const ownerItem= tools.filter(x => x._id === toolId);
    // console.log(ownerItem[0])

    return (
        <section className={styles["details-page"]}>
            <h1>Details</h1>

            <article className={styles["details-text"]}>
             
                <h3> {tool.brand}</h3>
                <h4> {tool.category}</h4>
                <img src={tool.imageUrl} alt='tool' />
                {tool.price && (
                    <p>Price per month: {tool.price}</p>
                )}
                {tool.weeklyPrice && (
                    <p>Price per week: {tool.weeklyPrice}</p>
                )}
                <p>Description: {tool.description}</p>
                {isAuthenticated && (
                    <>

                        {/* Contacts: {tool.author.email}  */}

                        <div className={styles["buttons"]}>
                            {tool._ownerId === userId && (
                                <div>
                                    <Link to={`/details/${toolId}/edit`} className={styles["btn-edit"]}>Edit</Link>
                                    <Link to={`/details/${toolId}/delete`} className={styles["btn-delete"]}>Delete</Link>
                                    <Link to={`/catalog`} className={styles["btn-back"]}>Back</Link>
                                </div>
                            )}

                            {tool._ownerId !== userId && (
                                <>
                                    {!isRented && (
                                        <>
                                            <Link to={`/details/${userId}/rent`} className={styles["btn-rent"]} onClick={() => onToolRent(toolId)}>Rent</Link>
                                            <Link to={'/catalog'} className={styles["btn-back"]}>Back</Link>
                                        </>
                                    )}
                                    {isRented && (
                                        <>
                                            <p className="wish-pub">You already added this tool to your rent list</p>
                                            <Link to={`/details/${userId}/rent`} className={styles["btn-back"]}>Back</Link>
                                        </>
                                    )}
                                </>
                            )}

                        </div>
                    </>
                )}
                {!isAuthenticated && (

                    <Link to={`/catalog`} className={styles["btn-back"]}>Back</Link>
                )}

            </article>
        </section>

    )
}