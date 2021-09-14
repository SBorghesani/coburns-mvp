import React from "react";
import { Route } from "react-router-dom";
import { Combinations } from './combos/Combinations'
import { CombinationList} from './combos/CombinationList'
import { OrderList } from "./orders/OrderList";

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/build">
                <Combinations />
            </Route>
            <Route path="/myCombinations">
                <CombinationList />
            </Route>
            <Route path="/orderHistory">
                <OrderList />
            </Route>
        </>
    )
}