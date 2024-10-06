// Function to format a number with thousands separator (1000000 to 1,000,000) and commas for decimals
export const formatThousands = (num) => {
  if (typeof num !== 'number' && typeof num !== 'string') {
    return ''
  }
  
  const numStr = typeof num === 'number' ? num.toString() : num
  const [integerPart, decimalPart] = numStr.split('.')
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
  // handle case when there for example user sets a point after some numbers there arent any numbers yet
  if (decimalPart === undefined) {
    return formattedIntegerPart
  }
  
  return decimalPart === '' 
    ? `${formattedIntegerPart}.` 
    : `${formattedIntegerPart}.${decimalPart}`
}
