import { useEffect, useState } from "react"
import { getAllOrders, getCurrentUser } from "../ApiManager"




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



// {orders.map(
//     (order) => {
//     if (parseInt(currentUser) === order.user.Id) {
//         console.log(orders)
//         return <div className="orders" key={`order--${order.id}`}>
//             <ul className="orders__list">
//                 <li><h3>{`order#: ${order.id}`}</h3></li>
//             </ul>
//         </div>
//     }
// })}