import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllSavedCombos, getCurrentUser } from '../ApiManager'
import './CombinationList.css'


export const CombinationList = () => {
    const [combinations, updateCombinations] = useState([])
    const history = useHistory()
    const currentUser = getCurrentUser()
    let comboCounter = 0

    useEffect(() => {
        getAllSavedCombos()
            .then((comboArray) => {
                updateCombinations(comboArray)
            })
        },
        []
    )

    const calculateTotalPrice = (comboObject) => {
        return (comboObject.material.price + comboObject.hinge.price + comboObject.color.price 
            + comboObject.dimensions.price).toFixed(2)
    }

    return (
        <>
            {combinations.map(
                (combination) => {
                    comboCounter++
                    if (parseInt(currentUser) === combination.userId) {
                        return <div key={`combination--${combination.id}`}>
                            <ul className={`combination__list`}>
                                <li> <h3>{`Saved Combination #${comboCounter}`} </h3></li> 
                                <li> {`Material: ${combination.material.materialType}`}</li>
                                <li>{`Hinge: ${combination.hinge.hingeType}`}</li>
                                <li>{`Color: ${combination.color.color}`}</li>
                                <li>{`Dimensions: ${combination.dimensions.dimension}`}</li>
                                <li>{`Total Price: $${calculateTotalPrice(combination)}`}</li>
                                <button onClick={() => {
                                    // deleteTicket(ticket.id)
                                }}>Delete</button>
                            </ul>
                        </div>
                    }
                })
            }
        </>
    )
}