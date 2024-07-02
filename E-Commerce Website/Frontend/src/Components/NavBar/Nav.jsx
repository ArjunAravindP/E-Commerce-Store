import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { IoClose, IoMenu } from "react-icons/io5"
import "./Nav.css"
import logo from "../../assets/4145668-ai.png"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import HomeIcon from "@mui/icons-material/Home"
import ClearAllIcon from "@mui/icons-material/ClearAll"
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1150 && showMenu) {
        setShowMenu(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [showMenu])

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <img src={logo} alt="" />
          <p>The Store</p>
        </NavLink>

        <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                <HomeIcon /> Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="products" className="nav__link" onClick={closeMenuOnMobile}>
                <ClearAllIcon /> All Products
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="my-account" className="nav__link" onClick={closeMenuOnMobile}>
                <AccountCircleIcon /> My Account
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/cart" className="nav__link" onClick={closeMenuOnMobile}>
                <ShoppingCartIcon /> Cart
              </NavLink>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
