import styles from './Details.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as toolsService from '../../services/toolsService';
// import * as authService from '../../services/toolsService';
import { AuthContext } from '../../contexts/AuthContext';

export default function Details({
    _id,
    // toolOwner,

}) {
    const { toolId } = useParams();
    const [tool, setTool] = useState([]);
   
    const { isAuthenticated, userId, onToolRent, myRents } = useContext(AuthContext);  

    useEffect(() => {

        toolsService.getOne(toolId)

            .then((result) => {
                console.log(result)
                setTool(result)
            });
    }, [toolId]);

   
    


    //   const email = tool.author.email

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
    const isRented = myRents.find(x => x._id === toolId);

    return (
        <section className={styles["details-page"]}>
            <h1>Details</h1>

            <article className={styles["details-text"]}>
                <div>
                    {/* Contacts: */}
                </div>
                {/* <button onClick={() => console.log(brand)}>Test</button> */}
                <h3> {tool.brand}</h3>
                <h4> {tool.category}</h4>
                <img src={tool.imageUrl} alt='tool' />
                {tool.price && (
                    <p>Price per month: {tool.price}</p>
                )}
                {!tool.price && (
                    <p>Price per week: {tool.weeklyPrice}</p>
                )}
                <p>Description: {tool.description}</p>
                {isAuthenticated && (
                    <div className={styles["buttons"]}>
                        {tool._ownerId === userId && (
                            <div>
                                <Link to={`/details/${toolId}/edit`} className={styles["btn-edit"]}>Edit</Link>
                                <Link to={`/details/${toolId}/delete`} className={styles["btn-delete"]}>Delete</Link>

                            </div>
                        )
                        }

                        {tool._ownerId !== userId && (
                            <>
                                {isRented && (
                                    <>
                                        <p className="wish-pub">You already added this tool to your rent list</p>
                                        <Link to={`/details/${userId}/rent`} className={styles["btn-back"]}>Back</Link>
                                    </>
                                )}
                                {!isRented && (
                                    <>
                                        <Link to={`/details/${userId}/rent`} className={styles["btn-rent"]} onClick={() => onToolRent(toolId)}>Rent</Link>
                                        <Link to={'/catalog'} className={styles["btn-back"]}>Back</Link>
                                    </>
                                )}


                            </>
                        )
                        }

                    </div>
                )}

            </article>
        </section>

    )
}