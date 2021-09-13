import React from "react";
import { Route } from "react-router-dom";
import { Combinations } from './combos/Combinations'

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/build">
                <Combinations />
            </Route>
        </>
    )
}