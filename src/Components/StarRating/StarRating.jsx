import React from 'react';
import styles from './StarRating.module.css'



const StarRating = () => {
  
  return (
        <div className={styles.container}>
          <div className={styles.star}>⭐</div>
          <div className={styles.star}>⭐</div>
          <div className={styles.star}>⭐</div>
          <div className={styles.star}>⭐</div>
          <div className={styles.star}>⭐</div>
        </div>
      )

  

  return <div>{renderStars()}</div>;
};

export default StarRating;

// const StarRating = ({ rating }) => {
//   const renderStars = () => {
//     const stars = [];

//     for (let i = 1; i <= 5; i++) {
//       const starClass = i <= rating ? 'text-yellow-500' : 'text-gray-400';
//       stars.push(
//         <svg
//           key={i}
//           className={`w-4 h-4 fill-current inline ${starClass}`}
//           viewBox="0 0 20 20"
//         >
//           <path
//             d="M10 1.18l2.241 6.886h7.241l-5.86 4.267 2.253 6.912L10 15.737l-5.876 4.456 2.253-6.912L0 8.066h7.24L9.88 1.18z"
//           />
//         </svg>
//       );
//     }

//     return stars;
//   };

//   return <div>{renderStars()}</div>;
// };

// export default StarRating;