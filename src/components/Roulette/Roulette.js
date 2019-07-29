import React, { Component } from 'react';
import classes from './Roulette.module.css';
import Board from '../Board/Board';
import RecentNumbers from '../RecentNumbers/RecentNumbers';
import BettingPanel from '../BettingPanel/BettingPanel';
class Roulette extends Component {
/**
 * Component for entire Roulette game and its children
 */
    state = {
        spinNum: 0,
        spin: false,
        spin_complete: false,
        lastFive: [0, 0, 0, 0, 0],
        btn_disable: false
    }
    /**
     * Create the object used for determining the random result and the ammount to scroll the roulette ribbon by
     * 
     * @return {object} - The built object
    */
    create_obj = () => {
        let obj = {}
        for (let i = 0; i < 15; i++) {
            if (i === 0) {
                obj[i] = [5983, 6037];
            } else {
                let last = obj[i - 1][1];
                obj[i] = [Math.round((last + 2.34) * 100) / 100, Math.round((last + 2.34 + 54) * 100) / 100];
            }
        }
        return obj
    }
    /**
     * Pick and random number given the object
     * 
     * @param {object} - Object built using create_obj()
     * @return {float} - The ammount to scroll the roulette ribbon by
     */
    pick_random_number = (obj) => {
        let keys = Object.keys(obj)
        let random_key = keys[keys.length * Math.random() << 0];
        let range_arr = obj[random_key]
        let random_offset = Math.random() * (range_arr[1] - range_arr[0]) + range_arr[0];
        return random_offset;
    }
    /**
     * Function used to reset the state when a spin is finished
     */
    reset = () => {
        this.setState({ spin: false, spin_complete: false, btn_disable: false })
    }
    /**
     * Used to add a number to the lastFive to be shown in the recent spins section
     * 
     * @param {integer} - Number to add to the lastFive array 
     */
    addToLastFive = (number) => {
        let copy = [...this.state.lastFive]
        copy.splice(-1, 1);
        copy.unshift(number);
        this.setState({ lastFive: copy })
    }
    /**
     * Used to find what number the ribbon landed on given the ribbon offset
     * 
     * @param {integer} chosen - The ribbon offset
     * @param {object} obj - The object built via create_obj()
     */
    getResult = (chosen, obj) => {
        for(var key in obj){
            if(obj[key][0] <= chosen && obj[key][1] >= chosen){
                return key
            }
        }
    }
    /**
     * Used to spin the ribbon
     * 
     * @return {integer} The result of the spin 
     */
    spin = () => {
        const number_obj = this.create_obj()
        const chosen_number = this.pick_random_number(number_obj)
        const result = this.getResult(chosen_number, number_obj)
        let current_spinNum = this.state.spinNum
        this.setState({ spin: true, spinNum: current_spinNum += 1, chosen: chosen_number, chosen_num: parseInt(result) })
        this.setState({ btn_disable: true })
        setTimeout(() => {
            this.setState({ spin_complete: true, spin: false })
            this.addToLastFive(result)
            setTimeout(() => {
                this.reset()
                clearTimeout()
            }, 1000)
            clearTimeout()
        }, 8500)
        return result;
    }


    render() {
        let btn_dis_style = null;
        if(this.state.btn_disable){
            btn_dis_style = {
                cursor: 'not-allowed'
            }
        }
        let disabledBool = (this.state.btn_disable) ? "disabled" : "";
        const black_numbers = [1, 3, 5, 7, 9, 11, 13]

        return (
            <div className={classes.App}>
                <div className={classes.centre}></div>
                <Board 
                    spin={this.state.spin} 
                    complete={this.state.spin_complete} 
                    chosen_number={this.state.chosen} 
                    black_numbers={black_numbers} 
                />
                <div className={classes.mid_container}>
                    <RecentNumbers
                        title="Last 5 Spins"
                        lastFive={this.state.lastFive}
                        black_numbers={black_numbers}
                    />
                    <BettingPanel
                        spin={this.spin}
                        complete={this.state.spin_complete}
                        chosen_number={this.state.chosen_num}
                        disabledBool={disabledBool}
                        btn_dis_style={btn_dis_style}
                        title="Betting Panel"
                    />
                </div>
            </div>
        )
    }
}

export default Roulette;
