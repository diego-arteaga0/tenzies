export default function Die(props){
    const id = props.id
    const styles= {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return ( 
        <button 
            aria-label={`Die with value of ${props.value}, 
            ${props.held ? "held" : "not held"}`}
            aria-pressed={props.isHeld}
            style={styles} 
            onClick={() => props.hold(props.id)} 
            >{props.value}</button>
    )
}