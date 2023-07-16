//import React from 'react';
import {Link} from 'react-router-dom';
const Book = ({books})=>{
const {id, image, title, author, price} = books;

    return(
        <div>
            <strong>This is were the info will be rendered. Please be patient.</strong>
            <div>
<Link to={`/details:${id}`}><img src={image} alt={`${title} from ${author}`}/></Link>
            </div>

            <div>
                {title}
            </div>
            <div>
                {author}
            </div>
            <div>
                <strong>And the price is: {price}</strong>
            </div>
        </div>
    )
}

export default Book;