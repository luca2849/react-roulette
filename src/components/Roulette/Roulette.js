import React, { Component } from 'react';
import classes from './Roulette.module.css';
import Board from '../Board/Board';
import RecentNumbers from '../RecentNumbers/RecentNumbers';
import BettingPanel from '../BettingPanel/BettingPanel';
class Roulette extends Component {

    state = {
        spinNum: 0,
        spin: false,
        spin_complete: false,
        lastFive: [0, 0, 0, 0, 0],
        btn_disable: false
    }
    number_obj = {}
    // aim_for_obj = {
    //     0: [5983, 6037],
    //      // DIFF BETWEEN RECORDS - 6039.34 - 6037 - 2.34
    //      // DIFF BETWEEN ARRAY INDEXES - 54
    //     1: [6039.34, 6093.34]
    // }
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
    create_number_obj = () => {
        let obj = {};
        for (let i = 0; i < 15; i++) {
            if (i === 0) {
                obj[i] = 5167;
            } else {
                obj[i] = 5167 + (i * 56.34)
            }
        }
        return obj
    }

    pick_random_number = (obj) => {
        let keys = Object.keys(obj)
        let random_key = keys[keys.length * Math.random() << 0];
        let range_arr = obj[random_key]
        let random_offset = Math.random() * (range_arr[1] - range_arr[0]) + range_arr[0];
        console.log(random_offset)
        return random_offset;
    }
    reset = () => {
        this.setState({ spin: false, spin_complete: false, btn_disable: false })
    }
    addToLastFive = (number) => {
        let copy = [...this.state.lastFive]
        copy.splice(-1, 1);
        copy.unshift(number);
        this.setState({ lastFive: copy })
    }
    getResult = (chosen, obj) => {
        for(var key in obj){
            if(obj[key][0] <= chosen && obj[key][1] >= chosen){
                return key
            }
        }
    }
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
        const object = this.create_obj();
        const number_obj = this.create_number_obj();
        const black_numbers = [1, 3, 5, 7, 9, 11, 13]

        return (
            <div className={classes.App}>
                <div className={classes.centre}></div>
                <Board 
                    spin={this.state.spin} 
                    complete={this.state.spin_complete} 
                    number_obj={number_obj}
                    object={object}
                    chosen_number={this.state.chosen} 
                    black_numbers={black_numbers} 
                />
                {/* <button style={btn_dis_style} className={classes.spinButton} onClick={this.spin} disabled={disabledBool}>Spin</button> */}
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
                        number_obj={number_obj}
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
