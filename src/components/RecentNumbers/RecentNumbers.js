import React from 'react';
import classes from './RecentNumbers.module.css';
import RecentNumber from './RecentNumber/RecentNumber'

const RecentNumbers = (props) => {
    const black_numbers = props.black_numbers.map(String)
    const most_recent_value = props.lastFive[0]
    let colour;
    if (black_numbers.includes(most_recent_value.toString())) {
        colour = 'black';
    } else if (most_recent_value.toString() === "0") {
        colour = 'green';
    } else {
        colour = 'red';
    }
    return (

        <div className={classes.container}>
            <div className={classes.last_win}>
                <h1>Most Recent Spin</h1>
                <RecentNumber number={most_recent_value} colour={colour} />
            </div>
            <h1>{props.title}</h1>
            {props.lastFive.map((value, index) => {
                let colour = null;
                if (black_numbers.includes(value.toString())) {
                    colour = 'black';
                } else if (value.toString() === "0") {
                    colour = 'green';
                } else {
                    colour = 'red';
                }
                return (
                    <RecentNumber number={value} key={index} colour={colour} />
                )
            })}
        </div>
    )
}

export default RecentNumbers