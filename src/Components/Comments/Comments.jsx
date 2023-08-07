import style from './Comments.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentById, postComment, updateCommentById } from '../../redux/actions/actions'
import { AiOutlineStar, AiFillStar, AiOutlineDelete } from 'react-icons/ai'
import { BiSolidRename } from 'react-icons/bi'
import { PiPencilLineBold } from 'react-icons/pi'
import spinner from './Spinner.module.css'
import Modal from 'react-modal'


const Comments = ({ id, book }) => {

    const loggedIn = useSelector(state => state.access.state)

    const userId = useSelector(state => state.access.ref)

    const dispatch = useDispatch()

    const [rating, setRating] = useState(1);

    const MAX_STARS = 5

    const [showSpinner, setShowSpinner] = useState(false)

    const [commentToEdit, setCommentToEdit] = useState({
        comment: '',
        bookId: id,
        rating: 1
    })

    const [comments, setComments] = useState(book.comments)

    useEffect(() => {
        setComments(book.comments)
    }, [book.comments])



    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const [editCommentId, setEditCommentId] = useState(null)

    const openEditModal = (commentId, commentText, rating) => {
        setEditCommentId(commentId);
        setCommentToEdit({
            ...commentToEdit,
            comment: commentText,
            rating: rating
        });
        setIsEditModalOpen(true);
    }

    const handleEditComment = () => {
        const finalComment = {
            id: editCommentId,
            comment: commentToEdit.comment,
            rating: 5
        }
        dispatch(updateCommentById(finalComment))
        setIsEditModalOpen(false)
        const updatedComments = comments.map(comment =>
            comment.id === editCommentId ? { ...comment, comment: commentToEdit.comment, rating: 5 } : comment
        );
        setComments(updatedComments);
    }

    const handleDeleteComment = (commentId) => {
        dispatch(deleteCommentById(commentId))
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    }

    useEffect(() => {
        setForm(prevForm => ({
            ...prevForm,
            rating: rating,
        }));
    }, [rating]);


    const [form, setForm] = useState({
        comment: '',
        bookId: id,
        userId: userId,
        rating: 0
    })




    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.comment.length > 5) {
            dispatch(postComment(form))

            setShowSpinner(true)
            setTimeout(() => {
                setShowSpinner(false)
                window.location.reload()
            }, 2000)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    return (
        <div>
            <div>
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Editar Comentario"
                >
                    <h2>Editar Comentario</h2>
                    <textarea
                        value={commentToEdit.comment}
                        onChange={(e) => setCommentToEdit({
                            ...commentToEdit,
                            comment: e.target.value
                        })}
                    />
                    <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                    <button onClick={handleEditComment}>Update Comment</button>
                </Modal>
                {!loggedIn
                    ? <div>
                        <h2>Log In to leave a comment</h2>
                        <Link to={'/access'} >Here</Link>
                    </div>
                    :
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h3>Leave a comment <PiPencilLineBold className={style.PiPencilLineBold} /></h3>
                            <textarea
                                value={form.comment}
                                name="comment"
                                onChange={handleChange}
                                id=""
                                cols="50"
                                rows="3"
                                placeholder='What do you think of the book?'>
                            </textarea>
                            {
                                [1, 2, 3, 4, 5].map((index) => (
                                    <span
                                        key={index}
                                        onClick={() => setRating(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {index <= rating ? <AiFillStar className={style.AiFillStar} /> : <AiOutlineStar className={style.AiOutlineStar} />}
                                    </span>
                                ))
                            }
                            <input
                                disabled={form.comment.length < 5}
                                type="submit"
                                value="Send" />
                        </form>
                        {showSpinner ? <span className={spinner.loader}></span> : null}
                    </div>
                }
            </div>
            {comments && comments.map((comment, index) => (
                <div className={style.commentContainer} key={index}>
                    <div className={style.commentText}>
                        <p>{comment.comment}</p>
                    </div>
                    <div className={style.starRating}>
                        {Array.from({ length: MAX_STARS }).map((star, starIndex) => (
                            <span key={starIndex}>
                                {starIndex < comment.rating ? <AiFillStar className={style.AiFillStar} /> : <AiOutlineStar className={style.AiOutlineStar} />}
                            </span>
                        ))}
                        {userId === comment.userId
                            ?
                            <>
                                <div>
                                    <button style={{ cursor: 'pointer' }} onClick={() => openEditModal(comment.id, comment.comment, comment.rating)}>
                                        <BiSolidRename />
                                    </button>
                                    <button style={{ cursor: 'pointer' }} onClick={() => handleDeleteComment(comment.id)}>
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </>
                            :
                            null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments