function createAccount(pin, amount=0) {
    return {
        checkBalance(tryPin) {
            if(tryPin === pin) {
                return `$${amount}`;
            } else {
                return 'Invalid PIN.'
            }
        },
        deposit(tryPin, depositAmt) {
            if(tryPin === pin) {
                amount += depositAmt;
                return `Succesfully deposited $${depositAmt}. Current balance: $${amount}.`;
            } else {
                return 'Invalid PIN.'
            }
        },
        withdraw(tryPin, withdrawAmt) {
            if(tryPin === pin) {
                if(withdrawAmt < amount) {
                    amount -= withdrawAmt;
                    return `Succesfully withdrew $${withdrawAmt}. Current balance: $${amount}.`;
                } else {
                    return "Withdrawal amount exceeds account balance. Transaction cancelled."
                }
            } else {
                return 'Invalid PIN.'
            }
        },
        changePin(tryPin, newPin) {
            if(tryPin === pin) {
                pin = newPin;
                return "PIN successfully changed!";
            } else {
                return 'Invalid PIN.'
            }
        }
    }
}

module.exports = { createAccount };
