import React from "react";
import { Route } from "react-router-dom";
import { Combinations } from './combos/Combinations'
import { CombinationList} from './combos/CombinationList'

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/build">
                <Combinations />
            </Route>
            <Route path="/myCombinations">
                <CombinationList />
            </Route>
        </>
    )
}