export const calculateAmortization = (system, loanValue, interestRate, paymentFrequency, numberOfPeriods) => {
  const loan = parseFloat(loanValue);
  const rate = parseFloat(interestRate) / 100 / parseFloat(paymentFrequency);
  const periods = parseInt(numberOfPeriods);

  let payment;
  switch (system) {
    case 'french':
      payment = calculateFrenchPayment(loan, rate, periods);
      break;
    case 'german':
      payment = calculateGermanInitialPayment(loan, rate, periods);
      break;
    case 'american':
      payment = calculateAmericanPayment(loan, rate);
      break;
    default:
      throw new Error('Invalid amortization system');
  }

  return generateAmortizationTable(system, loan, rate, periods, payment);
};

const calculateFrenchPayment = (loan, rate, periods) => {
  return (loan * rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1);
};

const calculateGermanInitialPayment = (loan, rate, periods) => {
  return loan / periods + loan * rate;
};

const calculateAmericanPayment = (loan, rate) => {
  return loan * rate;
};

const generateAmortizationTable = (system, loan, rate, periods, initialPayment) => {
  let balance = loan;
  const table = [];

  for (let i = 1; i <= periods; i++) {
    const interest = balance * rate;
    let principal, payment;

    switch (system) {
      case 'french':
        payment = initialPayment;
        principal = payment - interest;
        break;
      case 'german':
        principal = loan / periods;
        payment = principal + interest;
        break;
      case 'american':
        payment = i === periods ? initialPayment + balance : initialPayment;
        principal = i === periods ? balance : 0;
        break;
    }

    balance -= principal;

    table.push({
      period: i,
      payment: payment.toFixed(2),
      principal: principal.toFixed(2),
      interest: interest.toFixed(2),
      balance: Math.max(balance, 0).toFixed(2),
    });

    if (system === 'german') {
      initialPayment = loan / periods + balance * rate;
    }
  }

  return table;
};

export const calculateTotalInterest = (amortizationTable) => {
  return amortizationTable.reduce((total, row) => total + parseFloat(row.interest), 0).toFixed(2);
};

export const calculateTotalPayments = (amortizationTable) => {
  return amortizationTable.reduce((total, row) => total + parseFloat(row.payment), 0).toFixed(2);
};