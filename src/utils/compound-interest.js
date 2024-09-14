// funciones para calcular el interés compuesto

// hacemos la asignación del tiempo
const formulaTipoInteres = (typeInterestRate, capitalizationPeriod) => {
    const conversionFactors = {
      'daily': 365,
      'monthly': 12,
      'bimonthly': 6,
      'quarterly': 4,
      'semiannual': 2,
      'annual': 1
    };
  
    return conversionFactors[typeInterestRate] / conversionFactors[capitalizationPeriod];
  };
  
// función para calcular el monto
  export const calculateAmountComp = (capital, capInterestRate, typeInterestRate, capitalizationPeriod, time) => {
    const conversionFactorFraction = formulaTipoInteres(typeInterestRate, capitalizationPeriod);
    const interest = capInterestRate / 100;
    const effectiveInterestRate = interest * conversionFactorFraction;
    const amount = capital * Math.pow(1 + effectiveInterestRate, time);
    return parseFloat(amount.toFixed(4));
  };

// función para calcular el capital
  export const calculateCapitalComp = (amount, capInterestRate, typeInterestRate, capitalizationPeriod, time) => {
    const conversionFactorFraction = formulaTipoInteres(typeInterestRate, capitalizationPeriod);
    const interest = capInterestRate / 100;
    const effectiveInterestRate = interest * conversionFactorFraction;
    const capitalResult = amount / Math.pow(1 + effectiveInterestRate, time);
    return parseFloat(capitalResult.toFixed(4));
  };
  
// función para calcular la tasa de interés 1
  export const calculateInterestRate = (amount, capital, typeInterestRate, capitalizationPeriod, time) => {
    const conversionFactorFraction = formulaTipoInteres(typeInterestRate, capitalizationPeriod);
    const effectiveInterestRate = conversionFactorFraction / conversionFactorFraction;
    const capitalResult = Math.pow(amount / capital, 1 / time) - 1;
    return parseFloat(capitalResult.toFixed(4));
  };

// función para calcular la tasa de interés 2
  export const calculateInterestRate2 = (amount, capital) => {
    const capitalResult = amount - capital;
    return parseFloat(capitalResult.toFixed(4));
  };
  
// función para calcular el tiempo
  export const calculateTimeComp = (amount, capital, capInterestRate, typeInterestRate, capitalizationPeriod) => {
    const conversionFactorFraction = formulaTipoInteres(typeInterestRate, capitalizationPeriod);
    const effectiveInterestRate = conversionFactorFraction / conversionFactorFraction; // Esto parece una operación que no cambia el valor, la mantenemos por coherencia.
    const timeResult = (Math.log(amount) - Math.log(capital)) / Math.log(1 + capInterestRate / 100);
    return parseFloat(timeResult.toFixed(4));
  };
  