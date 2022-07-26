import { useState } from "react"

const ToggleButon = ({ BgColor, onClick, Value }) => {
    console.log(BgColor)

    return(
        <button style={{backgroundColor: BgColor}} onClick={onClick}>{Value}</button>
    )
};

export default ToggleButon;