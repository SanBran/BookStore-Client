//import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Book.module.css'

const Book = ({ books }) => {
    const { id, image, title, author, price } = books;

    const genericCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU"

    return (
        <div className={styles.container}>

            <Link className={styles.image} to={`/detail/${id}`}>
                <img
                    className={styles.imageSize}
                    src={image !== 'Image not Available' ? image : genericCover}
                    alt={`${title} from ${author}`}
                />
            </Link>

            <div className={styles.textContainer}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.author}>
                    {author}
                </div>
                {price && price ? <div className={styles.price}>${price}</div> : <div className={styles.price}>Free</div>}
            </div>
        </div>
    )
}

export default Book;