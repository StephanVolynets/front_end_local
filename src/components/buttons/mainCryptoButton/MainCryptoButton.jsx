'use client'

import styles from './MainCryptoButton.module.css'

import CircleCheckIcon from '@/components/icons/circleCheckIcon'

const MainCryptoButton = ({ id, logo, name, isSelected, onSelect, disableSelect }) => {

  const handleClick = () => {
    if (!disableSelect || isSelected) {
      onSelect(id)
    }
  }

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      disabled={!isSelected && disableSelect}
    >
      <div className={styles.crypto}>
        <img className={styles.logo} src={logo} alt={name} />
        <span className={styles.name}>{name}</span>
      </div>
      {isSelected && <CircleCheckIcon className={styles.circleCheckIcon} />}
    </button>
  )
}

export default MainCryptoButton
