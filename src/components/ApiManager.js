export const checkUserEmail = (userEmail) => {
    return fetch(`http://localhost:8088/users?email=${userEmail}`)
        .then(res => res.json())
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