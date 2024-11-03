import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, {useEffect} from 'react';

import {MainPage} from "./MainPage/MainPage";
import {ParticleLife} from "./ParticleLife/ParticleLife";

const pageName = "My Portfolio";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        children: [
        ]
    },
    {
        path: "/particles",
        element: <ParticleLife/>
    }
])

function App() {

    useEffect(() => {

        document.title = pageName;

    }, [])

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
