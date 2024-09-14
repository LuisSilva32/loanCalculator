// funciones para calcular las anualidades

// función para calcular el valor final
export const calculateFinalValue = (annuityRate, annuityValue, time) => {
    const newInterestRate = annuityRate / 100;
    const top = (Math.pow(1 + newInterestRate, time) - 1) / newInterestRate;
    const amount = annuityValue * top;
    return parseFloat(amount.toFixed(2));
  };
  
// función para calcular el valor final
 export const calculateCurrentValue = (annuityValue, annuityRate, time) => {
    const newInterestRate = annuityRate / 100;
    const bottom = (1 - Math.pow(1 + newInterestRate, -time)) / newInterestRate;
    return parseFloat((annuityValue * bottom).toFixed(2));
  };
  
 export const calculateAnnuityValue = (amount, annuityRate, time) => {
    const newInterestRate = annuityRate / 100;
    const top = (Math.pow(1 + newInterestRate, time) - 1) / newInterestRate;
    const annuity = amount / top;
    return parseFloat(annuity.toFixed(2));
  };
  
 export const calculateAnnuityRate = (amount, annuityValue, time) => {
    const interest = ((amount / annuityValue) - 1) / time;
    return parseFloat(interest.toFixed(2));
  };
  
// función para calcular el tiempo
 export  const calculateTime = (amount, annuityValue, annuityRate) => {
    const newInterestRate = annuityRate / 100;
    const timeInYears = Math.log(1 + (newInterestRate * amount / annuityValue)) / Math.log(1 + newInterestRate);
  
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
  
    return result + '.';
  };
  