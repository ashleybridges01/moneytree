import React, {useState} from 'react'
import {signup, login} from './utils/APIUtils'
import MoneyTreeLogo from './components/images/MoneyTreeLogo.png';

const Login = ({onAuthentication}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isNewUser, setIsNewUser] = useState(true)

    async function onButtonClick() {
        if (isNewUser) await signup(email, password)
        const userToken = await login(email, password)
        onAuthentication({email, userToken})
    }

    const style = {
        container: {
            backgroundImage: `url(${MoneyTreeLogo})`,
            backgroundSize: "cover",
            height: "100vh",
            color: "#bac964",
            textAlign: 'center',
        },
        h1: {
            marginTop: "0px",
            paddingTop: "15%"
        }
    }

    return (
        <div style={style.container}>
            <h1 style={style.h1}>MoneyTree</h1>
            <h2>Watch your money grow</h2>
            <input 
                placeholder="email@address"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <br/>
            <input 
                placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                type="password"
            />
            <br/>
            <button onClick={onButtonClick}>{isNewUser ? "Create Account" : "Login"}</button>
            <br/>
            <input
                type="checkbox"
                value={isNewUser}
                onChange={() => setIsNewUser(!isNewUser)} 
            /> I already have an account
        </div>
    )
}

export default Login 