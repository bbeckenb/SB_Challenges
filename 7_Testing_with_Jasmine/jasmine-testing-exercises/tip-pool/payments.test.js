describe("Payments Testing with setup and tear-down", function() {
    beforeEach(function () {
        billAmtInput.value = 40;
        tipAmtInput.value = 8;
    })

    it('createCurPayment should create an object of length 3 with keys representing bill amount tip amount and tip percent', function () {
       expect(createCurPayment()).toEqual({
        billAmt: '40',
        tipAmt: '8',
        tipPercent: 20,
      }) 
    })

    it('submitPaymentInfo should update the payment object from input form', function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1) 
        expect(allPayments['payment' + paymentId].billAmt).toEqual('40');
     })

     it('appendPaymentTable should add a table row to the payment table', function () {
       
        appendPaymentTable({
            billAmt: '80',
            tipAmt: '8',
            tipPercent: 10,
          }); 
          appendPaymentTable({
            billAmt: '40',
            tipAmt: '8',
            tipPercent: 20,
          }); 
        expect(paymentTbody.rows.length).toEqual(2)

     })

     it('updateSummary should aggregate and average all payment rows from PaymentTable', function() {
        allPayments = {
            payment1: {billAmt: '40', tipAmt: '8', tipPercent: 20},
            payment2: {billAmt: '80', tipAmt: '8', tipPercent: 10}
                };
        updateSummary();
        
        expect(summaryTds[0].innerHTML).toEqual('$120');
        expect(summaryTds[1].innerHTML).toEqual('$16');
        expect(summaryTds[2].innerHTML).toEqual('15%')
     })

    afterEach(function() {
        console.log(allPayments);
        billAmtInput.value = 0;
        tipAmtInput.value = 0;
        allPayments = {};
        let rows = paymentTbody.querySelectorAll('tr');
        for (let row of rows) {
            row.remove();
        }
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    })
});