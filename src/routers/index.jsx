import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import AddProblem from "../Pages/AddProblem";
import Detailpage from "../Pages/Detailpage";
import SepcialistsPage from "../Pages/SepcialistsPage";
import SpecialistDetails from "../Pages/SpecialistDetails";

export const routes=createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/addproblem",
        element:<AddProblem/>
    },
    {
        path:"/problem-details",
        element:<Detailpage/>
    },
    {
        path:"/specialist-page",
        element:<SepcialistsPage/>
    },
    {
        path:"/specialist-detail",
        element:<SpecialistDetails/>
    },
])