import style from './Comments.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComents } from '../../redux/actions/actions'


const Comments = () => {

    const loggedIn = useSelector(state => state.access.state)
    const state = useSelector(state => state)
    console.log(state);
    const dispatch = useDispatch()


    const [form, setForm] = useState({
        comment: '',
        rating: 0,
        bookId: '',
        userId: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('El form a enviar al back', form);
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
        console.log(form);
    }


    return (
        <div>
            <h2>Leave a comment</h2>
            {!loggedIn
                ? <div>
                    <h3>Log In to leave a comment</h3>
                    <Link to={'/access'} >Here</Link>
                </div>
                : <form onSubmit={handleSubmit}>
                    <textarea
                        name="comment"
                        onChange={handleChange}
                        id=""
                        cols="50"
                        rows="3"
                        placeholder='What do you think of the book?'>
                    </textarea>
                    <input
                        type="submit"
                        value="Send" />
                </form>}
        </div>
    )
}

export default Comments