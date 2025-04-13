import React from "react";

function Navbar(){
    return(
        <>
        <nav className="bg-orange-500 p-4 flex justify-between items-center">
            <div className="text-white text-2xl font-bold">
                Recipe Finder
            </div>
            <ul className="flex space-x-4 text-white">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/recipes">Recipes</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar;