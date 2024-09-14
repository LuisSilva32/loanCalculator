// funciones para calcular el interés simple

// función para calcular el capital
export const calculateCapital = (interest, rateInterest, time) => {
    const result = interest / ((rateInterest / 100) * time);
    return parseFloat(result.toFixed(2));
  };
  
  export const calculateCapitalWithAmount = (amount, rateInterest, time) => {
    return amount / (1 + (rateInterest / 100) * time);
  };
  
// función para calcular el monto final
  export const calculateFinalAmount = (capital, rateInterest, time) => {
    const result = capital * (1 + (rateInterest / 100) * time);
    return parseFloat(result.toFixed(2));
  };
  
  export const calculateFinalAmountWithInterest = (capital, interest) => {
    return capital + interest;
  };

// función para calcular el interés
  export const calculateInterest = (capital, rateInterest, time) => {
    const result = capital * (rateInterest / 100) * time;
    return parseFloat(result.toFixed(2));
  };
  
  export const calculateInterestWithAmount = (capital, amount) => {
    return amount - capital;
  };
  
// función para calcular la tasa de interés
  export const calculateRateInterest = (capital, interest, time) => {
    const result = (interest / (capital * time)) * 100;
    return parseFloat(result.toFixed(2));
  };
  
  export const calculateRateInterestWithAmount = (capital, amount, time) => {
    return ((amount - capital) / (capital * time)) * 100;
  };
  
// función para calcular el tiempo
  export const calculateTime = (capital, interest, rateInterest) => {
    const timeInYears = interest / (capital * (rateInterest / 100));
    const years = Math.floor(timeInYears);
    const remainingMonths = (timeInYears - years) * 12;
    const months = Math.floor(remainingMonths);
    const remainingDays = (remainingMonths - months) * 30;
    const days = Math.floor(remainingDays);
  
    let result = `${years} año${years !== 1 ? 's' : ''}`;
  
    if (months > 0) {
      result += `, ${months} mes${months !== 1 ? 'es' : ''}`;
    }
  
    if (days > 0) {
      result += ` y ${days} día${days !== 1 ? 's' : ''}`;
    }
  
    result += '.';
  
    return result;
  };
  
  export const calculateTimeWithAmount = (capital, amount, rateInterest) => {
    return (amount - capital) / (capital * (rateInterest / 100));
  };
  