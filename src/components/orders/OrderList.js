import { useEffect, useState } from "react"
import { getAllOrders, getCurrentUser, deleteOrder } from "../ApiManager"
import "./OrderList.css"


export const OrderList = () => {
    const [orders, setOrders] = useState([])
    const currentUser = getCurrentUser()
    let comboCounter = []

    useEffect(() => {
        getAllOrders()
            .then((orderArray) => {
                setOrders(orderArray)
            })
    },
        []
    )

    const cancelOrder = (id) => {
        deleteOrder(id)
            .then(() => {
                getAllOrders()
                    .then((data) => {
                        setOrders(data)
                    })
            })
    }

    return (
        <>
            <section className="orders__container">
            {orders.map(
                (order) => {
                    if (parseInt(currentUser) === order.userId) {
                        comboCounter.push(order)
                        return <div className="orders" key={`order--${order.id}`}>
                            <ul className={`order__list`}>
                                <li> <h3>{`Order #${comboCounter.length} placed by ${order.user.name} on ${order.date}`} </h3></li>
                                <li><h4>{"Order Details:"}</h4></li>
                                <li>{`Material: ${order.material.materialType}, Color: ${order.color.color}, Hinge: 
                                    ${order.hinge.hingeType}, Dimensions: ${order.dimensions.dimension}`}</li>
                                <li>{`Requested install date: ${order.requestDate}`}</li>
                                <button onClick={() => {
                                    cancelOrder(order.id)
                                }}>Cancel</button>
                            </ul>
                        </div>
                    }
                })
            }
            </section>
        </>
    )
}



