export const calculateUVR = (lastUVR, inflation, startDate, endDate) => {
  const results = [];
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const totalDays = Math.round((endDate - startDate) / oneDay);
  
  for (let t = 0; t <= totalDays; t++) {
    const currentDate = new Date(startDate.getTime() + t * oneDay);
    // Adjust the calculation to match the example
    const uvrValue = lastUVR * Math.pow(1 + inflation, t / 30);
    
    results.push({
      day: t,
      date: formatDate(currentDate),
      uvr: uvrValue.toFixed(4)
    });
  }
  
  return results;
};

export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};