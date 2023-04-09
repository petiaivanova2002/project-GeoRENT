import styles from './Navigation.module.css';
import logo from './images.png';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export default function Navigation() {
  const { isAuthenticated, email, userId } = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" ><img src={logo} className={styles['logo']} alt="logo" /></Link>
        <h2 className="navbar-brand" >GEOrent</h2>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/catalog/lasers">Laser scanning sistems</Link></li>
                <li><Link className="dropdown-item" to="/catalog/gps">GPS receivers</Link></li>
                <li><Link className="dropdown-item" to="/catalog/drones">Drones</Link></li>
                <li><Link className="dropdown-item" to="/catalog/totals">Total stations</Link></li>
                <li><Link className="dropdown-item" to="/catalog/levels">Digital levels</Link></li>
                <li><Link className="dropdown-item" to="/catalog/accessories">Accessories</Link></li>
                <li><Link className="dropdown-item" to="/catalog">All products</Link></li>
              </ul>
            </li>

            {isAuthenticated && (
              <>

                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add tool</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myTools">My tools</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/details/${userId}/rent`}>My rents</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Logout </Link>
                </li>
                <li className="nav-item">
                  <p className="nav-link" > {email}</p>
                </li>

              </>
            )}

            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">About</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    //     <nav className={styles['navigation']}>
    //     <ul>         
    //     <h3><Link to="/" ><img src={logo} className={styles['logo']} alt="logo" /></Link></h3>
    //     <li><Link to="/" >Home</Link></li>
    //     <li><Link to="/add" >Add tools</Link></li>
    //     <div className={styles['dropdown']}>
    //         <button className={styles['dropbtn']}>Products
    //             <i className="fa fa-caret-down"></i>
    //         </button>
    //         <div className={styles["dropdown-content"]}>
    //             <li><Link to="/laser" >Laser scanning sistems</Link></li>
    //             <li><Link to="/gps" >GPS receivers</Link></li>
    //             <li><Link to="/total" >Total stations</Link></li>
    //             <li><Link to="/levels" >Digital levels</Link></li>
    //             <li><Link to="/accessories" >Accessories</Link></li>
    //             <li><Link to="/catalog" >All products</Link></li>
    //         </div>

    //     </div>
    //         <li><Link to="/register">Register</Link></li>
    //         <li><Link to="/login">Login</Link></li>
    //         <li><Link to="/logout">Logout</Link></li>
    //     </ul>
    // </nav>  

  )
}