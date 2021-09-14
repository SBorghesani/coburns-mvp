import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllSavedCombos, getCurrentUser, postOrder } from '../ApiManager'
import './CombinationList.css'
import generic from "../../images/genericDoor.png"


export const CombinationList = () => {
    const [combinations, updateCombinations] = useState([])
    const history = useHistory()
    const currentUser = getCurrentUser()
    const [order, updateOrder] = useState({
        material: "",
        color: "",
        hinge: "",
        dimensions: "",
    });
    
    useEffect(() => {
        getAllSavedCombos()
        .then((comboArray) => {
            updateCombinations(comboArray)
        })
    },
    []
    )

    const saveOrder = (order) => {
        const newOrder = {
            materialId: parseInt(order.materialId),
            colorId: parseInt(order.colorId),
            hingeId: parseInt(order.hingeId),
            dimensionsId: parseInt(order.dimensionsId),
            userId: parseInt(localStorage.getItem("coburn_customer"))
        }

        postOrder(newOrder)
            .then(() => {
                history.push("/orderHistory")
            })
    }
    
    const calculateTotalPrice = (comboObject) => {
        return (comboObject.material.price + comboObject.hinge.price + comboObject.color.price 
            + comboObject.dimensions.price).toFixed(2)
        }
        
        return (
            <>
            {combinations.map(
                (combination) => {
                    let comboCounter = 0
                    if (parseInt(currentUser) === combination.userId) {
                        return <div className="combinations" key={`combination--${combination.id}`}>
                            <img src={generic} alt="generic metal door" width="150" height="250"/>
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
                                <button onClick={() => {
                                    const copyState = {...combination}
                                    // const copyState = {...order}
                                    // copyState.material = combination.material.id
                                    // copyState.hinge = combination.hinge.id
                                    // copyState.color = combination.color.id
                                    // copyState.dimensions = combination.dimensions.id
                                    // copyState.userId = parseInt(currentUser)
                                    // updateOrder(copyState)
                                    // console.log(order)
                                    saveOrder(copyState)
                                }}>Purchase</button>
                            </ul>
                        </div>
                    }
                })
            }
        </>
    )
}