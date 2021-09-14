import { useEffect, useState } from "react"
import { getAllOrders, getCurrentUser, deleteOrder } from "../ApiManager"




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
                    setOrders(data)})
            })
    }

    return (
        <>
            {orders.map(
                (order) => {
                    if (parseInt(currentUser) === order.userId) {
                        comboCounter.push(order)
                        return <div className="orders" key={`order--${order.id}`}>
                            <ul className={`order__list`}>
                                <li> <h3>{`Order #${comboCounter.length}`} </h3></li>
                                <button onClick={() => {
                                    cancelOrder(order.id)
                                }}>Cancel</button>
                            </ul>
                        </div>
                    }
                })
            }
        </>
    )
}



