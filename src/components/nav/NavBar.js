import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link home" to="/home">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link start-buliding" to="/build">Custom Order</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link savedCombos" to="/myCombinations">Saved Combinations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link orders" to="/orderHistory">Order History</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("coburn_customer")
                        }
                    }>
                    Logout
                </Link>

            </li>
        </ul>
    )
}
