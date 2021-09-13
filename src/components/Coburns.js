import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from './nav/NavBar'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import "./Coburns.css"

export const Coburns = () => {
    document.title = "Coburn's Exclusive"

    return (
        <>
            <h1>Coburn's Exclusive</h1>
            <Route
                render={() => {
                    if (localStorage.getItem("coburn_customer")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </>
    )
}