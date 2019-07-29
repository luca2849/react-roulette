import React from 'react';
import classes from './Square.module.css';
import Auxillary from '../../hoc/Auxillary';

const Square = (props) => {
    let assignedClasses = [classes.square];
    if(props.colour === 'red'){
        assignedClasses.push(classes.red);
    } else if (props.colour === 'black'){
        assignedClasses.push(classes.black);
    } else{
        assignedClasses.push(classes.green);
    }
    return (
        <Auxillary>
            <p onClick={props.click} className={assignedClasses.join(" ")}>
                {props.number}
            </p>
        </Auxillary>
    )
}

export default Square