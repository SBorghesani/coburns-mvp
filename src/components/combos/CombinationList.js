import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllSavedCombos, getCurrentUser, postOrder, deleteCombination } from '../ApiManager'
import './CombinationList.css'
import generic from "../../images/genericDoor.png"


export const CombinationList = () => {
    const [combinations, updateCombinations] = useState([])
    const history = useHistory()
    const currentUser = getCurrentUser()
    let comboCounter = []
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

    const deleteCombo = (id) => {
        deleteCombination(id)
            .then(() => {
                getAllSavedCombos()
                    .then((data) => {
                        updateCombinations(data)
                    })
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
                    if (parseInt(currentUser) === combination.userId) {
                        comboCounter.push(combination)
                        return <div className="combinations__container">
                            <div className="combinations" key={`combination--${combination.id}`}>
                            <img src={generic} alt="generic metal door" width="150" height="250" />
                            <ul className={`combination__list`}>
                                <li key={`combination_counter`}> <h3>{`Saved Combination #${comboCounter.length}`} </h3></li>
                                <li key={`combination_material`}> {`Material: ${combination.material.materialType}`}</li>
                                <li key={`combination_hinge`}>{`Hinge: ${combination.hinge.hingeType}`}</li>
                                <li key={`combination_color`}>{`Color: ${combination.color.color}`}</li>
                                <li key={`combination_dimension`}>{`Dimensions: ${combination.dimensions.dimension}`}</li>
                                <li key={`combination_price`}>{`Total Price: $${calculateTotalPrice(combination)}`}</li>
                                <button onClick={() => {
                                    deleteCombo(combination.id)
                                }}>Delete</button>
                                <button onClick={() => {
                                    const copyState = { ...combination }
                                    saveOrder(copyState)
                                }}>Purchase</button>
                                <button type="button"
                                    className="btn btn-success "
                                    onClick={() => { history.push(`/myCombinations/${combination.id}`) }}>
                                    Update
                                </button>
                            </ul>
                        </div>
                        </div>
                    }
                })
            }
        </>
    )
}