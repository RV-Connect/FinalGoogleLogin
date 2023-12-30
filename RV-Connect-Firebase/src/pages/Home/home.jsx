import React from 'react'
import Login from '../../Login/login'

const Home = (props) => {
    return (
        <Login userData={props.userData} setUserData={props.setUserData} />
    )
}

export default Home