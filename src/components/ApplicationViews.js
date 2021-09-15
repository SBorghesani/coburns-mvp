import React from "react";
import { Route } from "react-router-dom";
import { Combinations } from './combos/Combinations'
import { CombinationList} from './combos/CombinationList'
import { OrderList } from "./orders/OrderList";
import { CombinationEdit} from "./combos/CombinationEdit"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/build">
                <Combinations />
            </Route>
            <Route exact path="/myCombinations">
                <CombinationList />
            </Route>
            <Route path="/myCombinations/:comboId(\d+)">
                <CombinationEdit />
            </Route>
            <Route path="/orderHistory">
                <OrderList />
            </Route>
        </>
    )
}