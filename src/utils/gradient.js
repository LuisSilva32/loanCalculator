// ARITHMETIC GRADIENT

// GROWING
export const calculateGradientAIncreasingVP = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const numerador = 1 - Math.pow(1 + interes, -numPeriod);
    const denominador = Math.pow(1 + interes, numPeriod);
  
    const termino1 = (paymentSeries * (numerador / interes));
    const termino2 = ((variationG / interes) * ((numerador / interes) - (numPeriod / denominador)));
  
    const valorPresent = termino1 + termino2;
    return parseFloat(valorPresent.toFixed(2));
  };
  
  export const calculateGradientAIncreasingVF = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const numerador = Math.pow(1 + interes, numPeriod) - 1;
  
    const termino1 = (paymentSeries * (numerador / interes));
    const termino2 = ((variationG / interes) * ((numerador / interes) - numPeriod));
  
    const valorFuture = termino1 + termino2;
    return parseFloat(valorFuture.toFixed(2));
  };
  
  // DECREASING
  export const calculateGradientADecreasingVP = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const numerador = 1 - Math.pow(1 + interes, -numPeriod);
    const denominador = Math.pow(1 + interes, numPeriod);
  
    const termino1 = (paymentSeries * (numerador / interes));
    const termino2 = ((variationG / interes) * ((numerador / interes) - (numPeriod / denominador)));
  
    const valorPresent = termino1 + termino2;
    return parseFloat(valorPresent.toFixed(2));
  };
  
  export const calculateGradientADecreasingVF = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const numerador = Math.pow(1 + interes, numPeriod) - 1;
  
    const termino1 = (paymentSeries * (numerador / interes));
    const termino2 = ((variationG / interes) * ((numerador / interes) - numPeriod));
  
    const valorFuture = termino1 + termino2;
    return parseFloat(valorFuture.toFixed(2));
  };
  
  // GEOMETRIC GRADIENT
  
  // INCREASING
  export const calculateGradientGIncreasingVP = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const variation = variationG / 100;
  
    const terminoExp1 = Math.pow(1 + variation, numPeriod);
    const terminoExp2 = Math.pow(1 + interes, -numPeriod);
  
    const numerador = (paymentSeries * (terminoExp1 * terminoExp2 - 1));
    const denominador = variation - interes;
  
    const valorPresent = numerador / denominador;
    return parseFloat(valorPresent.toFixed(2));
  };
  
  export const calculateGradientGIncreasingVF = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const variation = variationG / 100;
  
    const terminoExp1 = Math.pow(1 + variation, numPeriod);
    const terminoExp2 = Math.pow(1 + interes, numPeriod);
  
    const numerador = (paymentSeries * (terminoExp1 - terminoExp2));
    const denominador = variation - interes;
  
    const valorFuture = numerador / denominador;
    return parseFloat(valorFuture.toFixed(2));
  };
  
  // DECREASING
  export const calculateGradientGDecreasingVP = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const variation = variationG / 100;
  
    const terminoExp1 = Math.pow(1 - variation, numPeriod);
    const terminoExp2 = Math.pow(1 + interes, -numPeriod);
  
    const numerador = (paymentSeries * ((terminoExp1 * terminoExp2) - 1));
    const denominador = variation + interes;
  
    const valorPresent = numerador / denominador;
    return parseFloat(valorPresent.toFixed(2));
  };
  
  export const calculateGradientGDecreasingVF = (paymentSeries, variationG, interestRate, numPeriod) => {
    const interes = interestRate / 100;
    const variation = variationG / 100;
  
    const terminoExp1 = Math.pow(1 - variation, numPeriod);
    const terminoExp2 = Math.pow(1 + interes, numPeriod);
  
    const numerador = (paymentSeries * (terminoExp1 - terminoExp2));
    const denominador = variation + interes;
  
    const valorFuture = numerador / denominador;
    return parseFloat(valorFuture.toFixed(2));
  };

  export const calculateFirstGeometricPayment = (loanAmount, interestRate, growthRate, periods, gracePeriod) => {
    const i = interestRate / 100; // Convertir interés a porcentaje decimal
    const g = growthRate / 100; // Convertir tasa de crecimiento a decimal
    const n = periods - gracePeriod; // Número de periodos después del periodo de gracia
  
    // Fórmula para calcular el valor presente de una serie geométrica creciente
    const numerador = 1 - Math.pow(1 + g, -n);
    const denominador = i - g;
    const valorPresente = (loanAmount * (1 - Math.pow(1 + i, -n))) / i;
  
    // Calcular la primera cuota
    const primeraCuota = valorPresente * denominador / numerador;
  
    return parseFloat(primeraCuota.toFixed(2));
  };
  
  