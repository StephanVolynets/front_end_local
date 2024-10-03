'use client'

const CloseIcon = ({ className }) => {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 1L1 13M1 1L13 13" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default CloseIcon
