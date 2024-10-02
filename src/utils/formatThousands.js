// Function to format a number with thousands separator (1000000 to 1.000.000)
export const formatThousands = (num) => {
  if (typeof num !== 'number' && typeof num !== 'string') {
    return ''
  }
  const numStr = typeof num === 'number' ? num.toString() : num
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
