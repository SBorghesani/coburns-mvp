export const checkUserEmail = (userEmail) => {
    return fetch(`http://localhost:8088/users?email=${userEmail}`)
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return localStorage.getItem("coburn_customer")
}

export const createNewUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getMaterials = () => {
    return fetch("http://localhost:8088/materials")
        .then(res => res.json())
}
export const getColors = () => {
    return fetch("http://localhost:8088/colors")
        .then(res => res.json())
}
export const getHinges = () => {
    return fetch("http://localhost:8088/hinges")
        .then(res => res.json())
}
export const getDimensions = () => {
    return fetch("http://localhost:8088/dimensions")
        .then(res => res.json())
}

export const getAllSavedCombos = () => {
    return fetch("http://localhost:8088/savedCombinations?_expand=user&_expand=material&_expand=color&_expand=hinge&_expand=dimensions")
        .then(response => response.json())
}

export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders?_expand=material&_expand=color&_expand=hinge&_expand=dimensions&_expand=user")
        .then(response => response.json())
}

export const postOrder =(order) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    }

    return fetch("http://localhost:8088/orders", fetchOptions)
}

export const deleteCombination = (comboId) => {
    return fetch(`http://localhost:8088/savedCombinations/${comboId}`, {
        method: "DELETE"
    })
}

export const deleteOrder = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}`, {
        method: "DELETE"
    })
}

export const getCombination = (id) => {
    return fetch(`http://localhost:8088/savedCombinations/${id}/?_expand=material&_expand=color&_expand=dimensions&_expand=hinge&_expand=user`)
        .then(res => res.json())
}

export const updateCombination = (id, com) => {
    return fetch(`http://localhost:8088/savedCombinations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(com)
    })
}