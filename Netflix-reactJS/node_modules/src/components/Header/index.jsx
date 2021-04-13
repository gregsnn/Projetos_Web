import React from "react"
import "./Header.css"

export default ({black}) => {
    return (
        <header className={black ? "black" : ""}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg" alt="netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="http://getdrawings.com/free-icon/download-icon-anime-52.png" alt="usuario"/>
                </a>
            </div>
        </header>
    )
}