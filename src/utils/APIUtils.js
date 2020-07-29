import axios from 'axios'
const backEndURL = "http://localhost:3000"      
// const backEndURL = "https://young-garden-83966.herokuapp.com/"

export async function signup(email, password){
    const res = await axios.post(`${backEndURL}/users`, { 
        user: {email, password}
        })
    return res.data 
}

export async function login(email, password){
    const res = await axios.post(`${backEndURL}/user_token`, { 
        auth: {email, password}
        })
    return res.data.jwt 
}


export async function viewList(userToken){
    const result = await axios.get(`${backEndURL}/columns`, {headers: {
        Authorization: `Bearer ${userToken}`
    }})


    // transforming the backend data to look like the store data
    const transformedResults = {}
    result.data.forEach(list => transformedResults[list.column.id] = {
        ...list.column,
        cards: list.tiles
    })
    return {lists: transformedResults, listIds: Object.keys(transformedResults)}
} 

// Create list item - entity is named "column" on rails API
export async function createList(title, userToken){
    const result = await axios.post(`${backEndURL}/columns`, {
        column: {title}
    }, {headers: {
        Authorization: `Bearer ${userToken}`
    }})
    return {
        ...result.data,
        cards: []
    }
}

// // Update list entity (column)
// export async function updateList(title, userToken){
//     const result = await axios.patch(`${backEndURL}/columns/${columnID}`, {
//         column: {title}
//     }, {headers: {
//         Authorization: `Bearer ${userToken}`
//     }})
//     return result.data
// }

// // Delete list entity (column)
// export async function deleteList(userToken){
//     const result = await axios.delete(`${backEndURL}/columns/${columnID}`, {
//     }, {headers: {
//         Authorization: `Bearer ${userToken}`
//     }})
//     return result.data
// }

// Create card - referred to as as a tile on the backend API:
export async function createCard(listId, title, amount, expense, trafficLight, sandbox, date, userToken){
    const result = await axios.post(`${backEndURL}/tiles`, {
        tile: {
            column_id: listId,
            title: title,
            amount: amount,
            type: expense,
            sandbox: sandbox,
            datedue: date,
            trafficlight: trafficLight
        }

    }, {headers: {
        Authorization: `Bearer ${userToken}`
    }})
    return result.data
}

// // Update card (tile)
// export async function updateCard(listId, title, amount, expense, trafficLight, sandbox, date, userToken){
//     const result = await axios.patch(`${backEndURL}/tiles/${cardID}`, {
//         column_id: {listId},
//         title: {title},
//         amount: {amount},
//         type: {expense},
//         sandbox: {sandbox},
//         datedue: {date},
//         trafficlight: {trafficLight}
//     }, {headers: {
//         Authorization: `Bearer ${userToken}`
//     }})
//     return result.data
// }

// Delete card (tile)
export async function deleteCard(userToken, id){
    const result = await axios.delete(`${backEndURL}/tiles/${id}`, {
    }, {headers: {
        Authorization: `Bearer ${userToken}`
    }})
    return result.data
}