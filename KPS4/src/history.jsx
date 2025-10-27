import { Outlet } from "react-router-dom"
import NavBar from "./navbar"
import Footer from "./footer"
function History(){
    return(
        <>
        <NavBar/>
        <h1 className="text-9xl text-amber-600">History</h1>
        <Footer/>
        </>
    )
}
export default History