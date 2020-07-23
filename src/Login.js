import React, {useState} from 'react'
import {signup, login} from './utils/APIUtils'

const Login = ({onAuthentication}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isNewUser, setIsNewUser] = useState(true)

    async function onButtonClick() {
        if (isNewUser) await signup(email, password)
        const userToken = await login(email, password)
        onAuthentication({email, userToken})
    }

    return (
        <>
            <input 
                placeholder="email@address"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <input 
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
            />
            <button onClick={onButtonClick}>{isNewUser ? "Create Account" : "Login"}</button>
            <input
                type="checkbox"
                value={isNewUser}
                onChange={() => setIsNewUser(!isNewUser)} 
            /> I already have an account
        </>
    )
}

export default Login 