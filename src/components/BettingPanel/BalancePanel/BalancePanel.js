import React from 'react';

const BalancePanel = (props) => {
    return (
        <div>
            <p>Balance - {props.children} credits</p>
        </div>
    )
}

export default BalancePanel