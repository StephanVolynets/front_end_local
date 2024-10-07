'use client'

const FilterArrow = ({ className, onClick }) => {
  return (
    <svg className={className} onClick={onClick} width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.7284 5.28195L6.15355 0.295421C5.79217 -0.0984735 5.20783 -0.0984735 4.8503 0.295421L0.271632 5.28195C-0.30887 5.9147 0.102479 7 0.925178 7H10.0748C10.8975 7 11.3089 5.9147 10.7284 5.28195Z" fill="var(--tertiary)"/>
    </svg>
  )
}

export default FilterArrow
