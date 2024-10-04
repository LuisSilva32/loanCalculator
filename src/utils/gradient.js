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






  // grodiente aritmético crecient perpetuo
  export const calculateGradientAIncreasingPerpetualVP = (initialPayment, gradientIncrease, interestRate) => {
    const i = interestRate / 100;  // Convertimos la tasa a decimal
    const PV = (initialPayment / i) + (gradientIncrease / Math.pow(i, 2));  // Aplicamos la fórmula
    return parseFloat(PV.toFixed(2));  // Redondeamos a 2 decimales
  };

  // valor creciente anticipado
  export const calculateGradientAIncreasingAnticipatedVF = (initialPayment, gradientIncrease, interestRate, numPeriod) => {
    const i = interestRate / 100;  // Convertimos la tasa a decimal
    const A = initialPayment;  // Primer pago
    const G = gradientIncrease;  // Incremento de los pagos
  
    // Fórmulas ajustadas según la fórmula proporcionada
    const factor1 = A + (G / i);  // Parte inicial (A + G/i)
    const factor2 = ((Math.pow(1 + i, numPeriod) - 1) / i);  // Factor de acumulación de la serie
    const factor3 = (G * numPeriod) / i;  // Ajuste por los pagos crecientes
  
    // Fórmula completa
    const valorFuture = (factor1 * factor2 - factor3) * (1 + i);  // Multiplicamos al final por (1 + i)
  
    return parseFloat(valorFuture.toFixed(2));  // Redondeamos a 2 decimales
  };



  // funcion para calcular el valor presente geometrico creciente
  // export const calculateGradientGIncreasingVP = (initialPayment, growthRate, interestRate, numPeriod) => {
  //   const g = growthRate / 100;  // Convertimos la tasa de crecimiento a decimal
  //   const i = interestRate / 100;  // Convertimos la tasa de interés a decimal
  //   const A = initialPayment;  // Primer pago
  
  //   // Fórmula del valor presente
  //   const valorPresent = (A / (g - i)) * ((Math.pow(1 + g, numPeriod) / Math.pow(1 + i, numPeriod)) - 1);
  //   return parseFloat(valorPresent.toFixed(2));  // Redondeamos a 2 decimales
  // };
  
  
  // funcion para calcular el valor futuro geometrico creciente
  // export const calculateGradientGIncreasingVF = (initialPayment, growthRate, interestRate, numPeriod) => {
  //   const g = growthRate / 100;  // Convertimos la tasa de crecimiento a decimal
  //   const i = interestRate / 100;  // Convertimos la tasa de interés a decimal
  //   const A = initialPayment;  // Primer pago
  
  //   // Fórmula del valor futuro
  //   const valorFuture = (A / (g - i)) * (Math.pow(1 + g, numPeriod) - Math.pow(1 + i, numPeriod));
  //   return parseFloat(valorFuture.toFixed(2));  // Redondeamos a 2 decimales
  // };
  
  