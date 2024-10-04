const calculateVAN = (investment, cashFlows, interestRate) => {
    let van = -investment;
    for (let i = 0; i < cashFlows.length; i++) {
      van += cashFlows[i] / Math.pow(1 + interestRate, i + 1);
    }
    return van;
  };
  
  const findVANPositiveNegative = (investment, cashFlows, initialInterest) => {
    let interestFinal = 1.0;
    let step = 0.0001;
    let positiveVAN, negativeVAN, positiveInterest, negativeInterest;
  
    for (let interest = initialInterest; interest <= interestFinal; interest += step) {
      let van = calculateVAN(investment, cashFlows, interest);
      if (van < 0) {
        negativeVAN = van;
        negativeInterest = interest;
        break;
      }
    }
  
    for (let interest = initialInterest; interest >= 0; interest -= step) {
      let van = calculateVAN(investment, cashFlows, interest);
      if (van > 0) {
        positiveVAN = van;
        positiveInterest = interest;
        break;
      }
    }
  
    return { positiveVAN, negativeVAN, positiveInterest, negativeInterest };
  };
  
  const calculateIRR = (investment, cashFlows, initialInterest) => {
    const { positiveVAN, negativeVAN, positiveInterest, negativeInterest } = findVANPositiveNegative(investment, cashFlows, initialInterest);
    
    const difference = negativeInterest - positiveInterest;
    const equation = (positiveVAN - 0) / (positiveVAN - negativeVAN);
    let irr = positiveInterest + equation * difference;
    
    return irr * 100; // Convert to percentage
  };
  
  export const calculateResults = (investment, interest, cashFlows) => {
    const investmentValue = parseFloat(investment);
    let interestRate = interest ? parseFloat(interest) / 100 : null;
    const cashFlowValues = cashFlows.map(cf => parseFloat(cf));
  
    if (!interestRate) {
      const sum = cashFlowValues.reduce((a, b) => a + b, 0);
      const n = cashFlowValues.length;
      interestRate = (sum / investmentValue - 1) / n;
    }
  
    const van = calculateVAN(investmentValue, cashFlowValues, interestRate);
    const irr = calculateIRR(investmentValue, cashFlowValues, interestRate);
  
    return {
      van: van.toFixed(2),
      irr: irr.toFixed(2),
      isRentable: van > 0
    };
  };