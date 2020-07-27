import React from 'react'

const Dashboard = () => {

    const style = {
        background: {
            backgroundColor: "#BAC964",
            display: 'flex', 
            justifyContent: 'center'
        },
        dashboard: {
            backgroundColor: "silver",
            textAlign: 'left',
            width: "400px",
            border: "2px solid black",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            margin: "10px"
        },
        stats: {
            display: "flex"
        }        
    }

    let blueItems = 5800;
    let redItems = 3500;
    let amberItems = 1450;
    let greenItems = -100

    return (
        <div style={style.background}>
            <div style={style.dashboard}>

                <div style={{ width: "100%"}}>
                    <h1 style={{ textAlign: "center", margin: "2px" }}>Dashboard</h1>
                    <h4 style={{ textAlign: "right", marginBottom: "0px", marginTop: "0px", marginRight: "40px" }}>Total</h4>
                </div>
             
                <div style={style.stats}>
                    <div style={{ width: "80%"}}>
                        <h4 style={{marginLeft: "10px", color: "blue" }}>Cash and income:</h4>
                        <h4 style={{marginLeft: "10px", color: "red" }}>Remaining after critical costs:</h4>
                        <h4 style={{marginLeft: "10px", color: "yellow" }}>Remaining after important costs:</h4>
                        <h4 style={{marginLeft: "10px", color: "green" }}>Remaining after luxuries:</h4>
                    </div>

                    <div style={{ width: "20%"}}>
                        <h4>{blueItems.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</h4>
                        <h4>{redItems.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</h4>
                        <h4>{amberItems.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</h4>
                        <h4>{greenItems.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard