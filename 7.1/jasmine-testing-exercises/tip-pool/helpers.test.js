describe("Helpers Testing with setup and tear-down", function() {
    beforeEach(function () {
        allPayments = {
            payment1: {billAmt: '40', tipAmt: '8', tipPercent: 20},
            payment2: {billAmt: '80', tipAmt: '8', tipPercent: 10}
                };   
    })


     it('sumPaymentTotal should add payments of a certain type', function () {
        
        expect(sumPaymentTotal('billAmt')).toEqual(120);
        expect(sumPaymentTotal('tipAmt')).toEqual(16);
     })

     it('calculateTipPercent should use bill and tip inputs to calculate a percentage', function() {
        expect(calculateTipPercent(120, 16)).toEqual(13);
     })

     it('appendTD should add a data cell of inputted value element onto a table row', function() {
        let newTr = document.createElement('tr');
        appendTd(newTr, 'x');

        expect(newTr.innerHTML).toEqual('<td>x</td>');
     })

    afterEach(function() {
        allPayments = {};
    })
});