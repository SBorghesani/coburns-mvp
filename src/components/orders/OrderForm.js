import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { getCombination, getCurrentUser, postOrder } from '../ApiManager'



export const OrderForm = () => {

    const [combo, updateCombo] = useState({})
    const { comboId } = useParams()
    const history = useHistory()
    const currentUser = getCurrentUser()


    useEffect(() => {
        getCombination(comboId)
            .then((comboObject) => {
                updateCombo(comboObject)
            })
    },
        []
    )

    const sendOrder= (event) => {
        event.preventDefault()
        const updatedOrder = {
            materialId: combo?.materialId,
            colorId: combo?.colorId,
            hingeId: combo?.hingeId,
            dimensionsId: combo?.dimensionsId,
            price: combo.price,
            userId: parseInt(currentUser),
            address: combo?.address,
            phone: combo?.phone,
            business: combo?.business,
            requestDate: combo?.requestDate
        }
        
        postOrder(updatedOrder)
        .then(() => {
            history.push("/orderHistory/")
        })
        
    }


return (
    <form className="orderForm">
        <h2 className="orderForm__title">Order Form</h2>
        <fieldset>
            <label htmlFor="address"> Address </label>
            <input onChange={(event) => {
                const copyState = { ...combo }
                copyState.address = event.target.value
                updateCombo(copyState)
            }}
                type="text" id="address" className="form-control" placeholder="Street Address" required />
        </fieldset>
        <fieldset>
            <label htmlFor="phone"> Phone Number </label>
            <input onChange={(event) => {
                const copyState = { ...combo }
                copyState.phone = event.target.value
                updateCombo(copyState)
            }}
                type="tel" id="phone" className="form-control" placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="commercial">Is this for a business?</label>
                <input
                    onChange={
                        (event) => {
                            const copyState = { ...combo }
                            copyState.business = event.target.checked
                            updateCombo(copyState)
                        }
                    }
                    type="checkbox" />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="serviceDate">Requested Install Date</label>
                <input onChange={(event) => {
                    const copyState = { ...combo }
                    copyState.requestDate = event.target.value
                    updateCombo(copyState)
                }} type="date" id="date" className="form-control" placeholder="Select a Date" required />
            </div>
        </fieldset>
        <button className="btn btn-primary" onClick={sendOrder}>
            Submit Order
            </button>
        <button className="btn btn-primary" onClick={() => history.push('/myCombinations')}>
            Cancel
            </button>
    </form>
)
}


// history.push('/myCombinations')