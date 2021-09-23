export const checkUserEmail = (userEmail) => {
    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/users?email=${userEmail}`)
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return localStorage.getItem("coburn_customer")
}

export const createNewUser = (user) => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getMaterials = () => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/materials")
        .then(res => res.json())
}
export const getColors = () => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/colors")
        .then(res => res.json())
}
export const getHinges = () => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/hinges")
        .then(res => res.json())
}
export const getDimensions = () => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/dimensions")
        .then(res => res.json())
}

export const getAllSavedCombos = () => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/savedCombinations?_expand=user&_expand=material&_expand=color&_expand=hinge&_expand=dimensions")
        .then(response => response.json())
}

export const getAllOrders = () => {
    return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/orders?_expand=material&_expand=color&_expand=hinge&_expand=dimensions&_expand=user")
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

    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/orders/`, fetchOptions)
}

export const deleteCombination = (comboId) => {
    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/savedCombinations/${comboId}`, {
        method: "DELETE"
    })
}

export const deleteOrder = (orderId) => {
    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/orders/${orderId}`, {
        method: "DELETE"
    })
}

export const getCombination = (id) => {
    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/savedCombinations/${id}/?_expand=material&_expand=color&_expand=dimensions&_expand=hinge&_expand=user`)
        .then(res => res.json())
}

export const getCanvasCombo = (id) => {
    return fetch (`https://coburns-exclusive-bchgr.ondigitalocean.app/savedCombinations/${id}`)
        .then(res => res.json())
}

export const updateCombination = (id, com) => {
    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/savedCombinations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(com)
    })
}

export const getOrder = (id) => {
    return fetch(`https://coburns-exclusive-bchgr.ondigitalocean.app/orders/${id}/?_expand=material&_expand=hinge&_expand=color&_expand=dimensions&_expand=user`)
        .then(res => res.json)
}