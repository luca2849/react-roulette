import React, { Component } from 'react';
import classes from './Board.module.css';
import Square from '../Square/Square';
import Auxillary from '../../hoc/Auxillary';

class Board extends Component {
    render(){
        let numbers = [...Array(15).keys()]
        // numbers.splice(8, 0, "00")
        let output = []
        // output = [...numbers, ...numbers]
        output = [...numbers, ...numbers, ...numbers, ...numbers, ...numbers, ...numbers, ...numbers, ...numbers, ...numbers, ...numbers]
        const black_numbers = this.props.black_numbers;
        const squares = (
            <Auxillary>
                {output.map((number, index) => {
                    let colour = null;
                    if (black_numbers.includes(number)) {
                        colour = 'black';
                    } else if (number === 0 || number === "00"){
                        colour = 'green';
                    } else {
                        colour = 'red';
                    }
                    return <Square
                        key={index}
                        number={number}
                        colour={colour}
                    />
                })}
            </Auxillary>
        )
        // Random Scroll Px Value
        let style = {
            transition: "all 7999ms cubic-bezier(0, 0, 0.28, 1) 0s",
            transform: "matrix(1, 0, 0, 1, " + this.props.chosen_number * -1 + ", 0)"
            // transform: "matrix(1, 0, 0, 1, " + (6038 * -1) + ", 0)"
        }
        let containerClasses = [classes.spinItemsContainer];
        let spinner = null;
        if(this.props.spin === true){
            spinner = (
                <div style={style} className={containerClasses.join(" ")}>
                    {squares}
                </div>
            )
        } else{
            spinner = (
                <div className={containerClasses.join(" ")}>
                    {squares}
                </div>
            )
        }
        return (
            <Auxillary>
                <div className={classes.outer}>
                    <div className={classes.spinContainer}>
                        {spinner}
                    </div>
                </div>
            </Auxillary>

        )
    }

}

export default Board