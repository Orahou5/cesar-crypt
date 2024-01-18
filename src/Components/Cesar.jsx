import { useEffect, useReducer } from "react"
import { crypto } from "../js/crypto.js"

const initialState = {
    word: "",
    cryptWord: "",
    offset: 3,
    crypto: crypto(3)
}

const reducer = (state, action) => {
    switch(action.type) {
        case "setCrypto":
            const cry = crypto(action.offset ?? 3)
            return {...state, crypto: cry, offset: action.offset, cryptWord: cry.crypt(state.word)}
        case "crypt":
            return {...state, cryptWord: state.crypto.crypt(action.text), word: action.text ?? ""}
        case "decrypt":
            return {...state, word: state.crypto.decrypt(action.text), cryptWord: action.text}
        default:
            return state
    }
}

export function Cesar(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({type: "setCrypto", offset: props.offset})
        dispatch({type: "crypt", text: props.defaultText})
    }, [])

    const border = "border-2 rounded-md p-2 text-center bg-emerald-950 text-white"
    const spanBorder = `p-2 text-center bg-emerald-950 text-white`
    const borderInput = `${border} border-black hover:border-white focus:border-white focus:outline-none focus:ring-0 focus:ring-white transition duration-50 ease-in-out`

    return (
        <div className="h-screen flex flex-col justify-center items-center mx-auto m-0 bg-emerald-100">
            <div className="grid grid-rows-2 grid-flow-col-dense grid-cols-[minmax(0, 1fr)_minmax(0, 1fr)_6rem] gap-0.5 bg-emerald-950 p-6 rounded-md">
                <span className = {`${spanBorder} `}>Base</span>
                <input 
                    className= {`${borderInput}`} 
                    type="text" 
                    value={state.word} 
                    onChange={(e) => dispatch({type: "crypt", text: e.target.value})} 
                />
                <span className = {`${spanBorder} `} >Crypted</span>
                <input 
                    className= {`${borderInput}`}
                    type="text" 
                    value={state.cryptWord} 
                    onChange={(e) => dispatch({type: "decrypt", text: e.target.value})} 
                />
                <span className = {`${spanBorder} w-24`}>Offset</span>
                <div className = {`${borderInput} w-24 items-center`}>
                    <button onClick={(e) => dispatch({type: "setCrypto", offset: state.offset + 1})} className={`w-3`}>&#11165;</button>
                    <input 
                        className= {`bg-emerald-950 text-white text-center w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none`}
                        type="number" 
                        value={state.offset} 
                        onChange={(e) => dispatch({type: "setCrypto", offset: +e.target.value})}
                    />
                    <button className={`w-3`} onClick={(e) => dispatch({type: "setCrypto", offset: state.offset - 1})}>&#11167;</button>
                </div>
                
            </div>
        </div>
        
    )
}