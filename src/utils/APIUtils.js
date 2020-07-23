const backEndURL = "http://localhost:3000"      

export async function signup(email, password){
    const res = await axios.post(`{$backEndURL}/users`, { 
        user: {email, password}
        })
    return res.data 
}

export async function login(email, password){
    const res = await axios.post(`{$backEndURL}/user_token`, { 
        auth: {email, password}
        })
    return res.data.jwt 
}