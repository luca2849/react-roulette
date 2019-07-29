import React, { Component } from 'react';
import BalancePanel from './BalancePanel/BalancePanel'
import classes from './BettingPanel.module.css';

class BettingPanel extends Component {
    state = {
        bet: 0,
        balance: 10000,
        error: ""
    }
    handleChange = (event) => {
        if(event.target.value > this.state.balance){
            this.setState({error: "You cannot bet more than your balance."})
        } else if(event.target.value <= 0){
            this.setState({ error: "You cannot bet less than 0." })
        } else{
            this.setState({ bet: event.target.value, error: "" })
        }
    }
    getWinningColour = (win) => {
        let out;
        if(win % 2 === 0 && win !== 0){
            out = 'red';
        } else if(win % 2 === 1){
            out = 'black';
        } else if (win === 0){
            out = "green";
        }
        return out
    }
    betHandler = (colour, result) => {
        let mult = null;
        let old_balance = this.state.balance;
        this.setState({balance: old_balance - this.state.bet})
        let winning_colour = this.getWinningColour(parseInt(result));
        if (winning_colour === 'black' || winning_colour === 'red'){
            mult = 2;
        } else{
            mult = 14;
        }
        setTimeout(() => {
            if (colour === winning_colour) {
                let current_balance = this.state.balance;
                let current_bet = this.state.bet;
                let newBalance = current_balance += (current_bet * mult);
                this.setState({ balance: newBalance })
            }
        }, 8500)

    }

    clickHandle = (colour) => {
        if (this.state.error === "") {
            let result = this.props.spin();
            this.betHandler(colour, result);
        }

    }
    render() {
        let error = null;
        if(this.state.error){
            error = (
                <p className={classes.error}>{this.state.error}</p>
            )
        }
        return (
            <div className={classes.bettingPanel}>
                <h1>{this.props.title}</h1>
                <BalancePanel>{this.state.balance.toLocaleString()}</BalancePanel>
                <input className={classes.betInput} type="number" placeholder="Bet..." onChange={this.handleChange} />
                {error}
                <div className={classes.betButtons}>
                    <button className={classes.red} style={this.props.btn_dis_style} disabled={this.props.disabledBool} onClick={this.clickHandle.bind(this, 'red')}>Bet Red (X2)</button>
                    <button className={classes.green} style={this.props.btn_dis_style} disabled={this.props.disabledBool} onClick={this.clickHandle.bind(this, 'green')}>Bet Green (X14)</button>
                    <button className={classes.black} style={this.props.btn_dis_style} disabled={this.props.disabledBool} onClick={this.clickHandle.bind(this, 'black')}>Bet Black (X2)</button>
                </div>
            </div>
        )
    }

}

export default BettingPanel