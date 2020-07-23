import React, {useState} from 'react'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <input 
                placeholder="email@address"
                value={email}
                // onChange={event => setEmail(event.target.value)}
            />
            <input 
                placeholder="Password"
                // value={}
                // onChange={event => setPassword(event.target.value)}
                type="password"
            />
            <button>Signup</button>
        </>
    )
}

export default Login 