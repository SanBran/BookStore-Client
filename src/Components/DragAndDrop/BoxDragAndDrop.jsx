import React from 'react';
import styles from './DragAnDrop.module.css'

export const BoxDragAndDrop = ({ isDragging, onImageUpload, dragProps }) => {
    return (
      <div
        onClick={onImageUpload}
        {...dragProps}
        className={styles.module}
      >
        
      </div>
    )
  }
