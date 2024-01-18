import { Cesar } from "./Components/Cesar.jsx";

export function App() {
    return (
        <>
            <div className="main">
                <Cesar offset = {4} defaultText = {"Hello World!!!"}/>
            </div>
        </>
    )
}