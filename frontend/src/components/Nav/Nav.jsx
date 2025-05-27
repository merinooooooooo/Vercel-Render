import React from "react";
import { NavLink } from "react-router-dom";  // Usamos NavLink en vez de Link
import './Nav.css';

function Nav() {
    const logoUrl = "https://tvazteca.brightspotcdn.com/dims4/default/34538e9/2147483647/strip/true/crop/629x547+0+0/resize/928x807!/format/webp/quality/90/?url=http%3A%2F%2Ftv-azteca-brightspot.s3.amazonaws.com%2F5e%2F37%2F26b4a8b94d81acf963a05e40de41%2F482423.jpg ";  // Reemplaza con la URL de tu logo

    return (
        <>
        <nav className="navbar navbary navbar-expand-lg bg-body-tertiary w-100">
            <div className="navbar navbary navbar-expand-lg bg-body-tertiary">
                {/* Logo en la esquina izquierda */}
                <a className="navbar-brand itemnav" aria-current="page" href="/">
                    <img src={logoUrl} alt="Logo" className="navbar-logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* Usamos NavLink para poder resaltar el enlace activo */}
                            <NavLink className="nav-link itemnav" to="/games" activeClassName="active">Games</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link itemnav" to="/empleados" activeClassName="active">Clients</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Nav;
