import React from 'react';
import styles from './DragAnDrop.module.css'



export const ImageSelected = ({ 
    img, 
    loading, 
    onUpload, 
    onImageRemove, 
    onImageUpdate 
}) => {

  return (
    <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img className={styles.image} src={img} alt='image-selected' />
      </div>
      <div className={styles.buttonsContainer}>
        {
          loading
            ? <p className='loading-label'>Upload image ⏳...</p>
            : <>
              <button className={styles.button}  disabled={loading} onClick={onUpload}>Accept</button>
              <button className={styles.button}  disabled={loading} onClick={() => onImageUpdate(0)}>Update </button>
              <button className={styles.button}  disabled={loading} onClick={() => onImageRemove(0)}>Close </button>
            </>
        }
      
    </div>
    </div>
  )
}
