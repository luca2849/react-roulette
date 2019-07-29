import React from 'react';
import classes from './RecentNumber.module.css';

/**
 * Functional component for a singular recent number in the group
 * 
 * @param {object} props - Props passed to the component 
 * @return {JSX} - Returned JSX for display
 */
const RecentNumber = (props) => {
    let assignedClasses = [classes.number];
    if (props.colour === 'red') {
        assignedClasses.push(classes.red);
    } else if (props.colour === 'black') {
        assignedClasses.push(classes.black);
    } else {
        assignedClasses.push(classes.green);
    }
    return (
        <div className={assignedClasses.join(" ")}>
            <p>{props.number}</p>
        </div>
    )
}

export default RecentNumber