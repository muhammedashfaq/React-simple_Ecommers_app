// import React from 'react'
import { Routes, Route } from "react-router-dom";
import { RouteObjects } from "./RouteObjests";
import Register from '../Pages/user/UserRegister'
import Login from '../Pages/user/UserLogin'


const AppRoutes = () => {
  return (
    
    <div>
        {/* //loder */}
        <Routes>

            <Route path={RouteObjects.Register} element={<Register />} />
            <Route path={RouteObjects.Login} element={<Login />} />

        </Routes>


    </div>
  )
}


export default AppRoutes