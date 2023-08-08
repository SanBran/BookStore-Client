import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ rating }) => {
  let prom = 0;

  if (rating !== undefined) {
    let total = 0;
    rating.map((r) => {
      total += r.rating;
      return null; // Map function should return a value or null
    });

    prom = Math.ceil(total / rating.length);
  } else {
    prom = 5;
  }

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= prom; i++) {
      stars.push(
        <div key={i} className={styles.star}>
          ⭐
        </div>
      );
    }

    return stars;
  };

  return <div className={styles.container}>{renderStars()}</div>;
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