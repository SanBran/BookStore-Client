import style from './Comments.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentById, postComment, updateCommentById } from '../../redux/actions/actions'
import { AiOutlineStar, AiFillStar, AiOutlineDelete } from 'react-icons/ai'
import { BiSolidRename } from 'react-icons/bi'
import { PiPencilLineBold } from 'react-icons/pi'
import spinner from './Spinner.module.css'
import Modal from 'react-modal';

import edit_icon from '../../assets/icons/edit2_icon.svg';
import bin_icon from '../../assets/icons/bin_icon.svg';


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

    console.log(comments);

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
            rating: commentToEdit.rating
        };
        console.log('el comment final', finalComment);
        dispatch(updateCommentById(finalComment));
        setIsEditModalOpen(false);
        const updatedComments = comments.map((comment) =>
            comment.id === editCommentId
                ? { ...comment, comment: commentToEdit.comment, rating: commentToEdit.rating }
                : comment
        );
        setComments(updatedComments);
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteCommentById(commentId))
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
    }

    useEffect(() => {
        setForm(prevForm => ({
            ...prevForm,
            userId: userId,
            rating: rating,
        }));
    }, [rating, userId]);


    const [form, setForm] = useState({
        comment: '',
        bookId: id,
        userId: userId,
        rating: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (form.comment.length >= 1) {
            dispatch(postComment(form))
            console.log(form);
            setShowSpinner(true)
            setTimeout(() => {
                setShowSpinner(false)
                window.location.reload()
            }, 1000)
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
        <div className={style.container}>
            <div className={style.container2}>
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Editar Comentario"
                    className={style.modal}
                >
                    <div className={style.modalContent}>
                        <h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
                        <div className="flex items-center space-x-2 mb-2">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <span
                                    key={index}
                                    onClick={() =>
                                        setCommentToEdit({
                                            ...commentToEdit,
                                            rating: index
                                        })
                                    }
                                    className="cursor-pointer"
                                >
                                    {index <= commentToEdit.rating ? (
                                        <AiFillStar className="text-yellow-500 h-5 w-5" />
                                    ) : (
                                        <AiOutlineStar className="text-gray-400 h-5 w-5" />
                                    )}
                                </span>
                            ))}
                        </div>

                        <textarea
                            className={style.textarea}
                            value={commentToEdit.comment}
                            onChange={(e) =>
                                setCommentToEdit({
                                    ...commentToEdit,
                                    comment: e.target.value
                                })
                            }
                            rows="3"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className={style.botonSelect}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditComment}
                                className={style.botonSelect}
                            >
                                Update Comment
                            </button>
                        </div>
                    </div>
                </Modal>

                {!loggedIn ? (
                    <div>
                        <Link className={style.navigate} to={'/access'}>{'Log In to leave a comment →  '}</Link>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit} className={`p-4 rounded-lg shadow-md ${style.form}`}>
                            <div className={style.titleText}>
                                <h3 className={`text-lg font-semibold mb-2 ${style.text}`}>
                                Write your review 
                                </h3>
                                <div className="flex items-center space-x-2 mb-2">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            onClick={() => setRating(index)}
                                            className="cursor-pointer"
                                        >
                                            {index <= rating ? (
                                                <AiFillStar className="text-yellow-500 h-5 w-5 text-lg" />
                                            ) : (
                                                <AiOutlineStar className="text-lg text-gray-400 h-5 w-5" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className={style.description}>
                                <textarea
                                    value={form.comment}
                                    name="comment"
                                    onChange={handleChange}
                                    className={style.textarea}
                                    cols='90'
                                    rows="3"
                                    placeholder="What do you think of the book?"
                                />
                                
                                <input
                                    disabled={form.comment.length < 1}
                                    type="submit"
                                    value="Send review"
                                    className={`${style.boton} ${form.comment.length < 1
                                        ? style.botonBase
                                        : style.botonActivo
                                        }`}
                                />
                            </div>
                        </form>
                                <div className='mt-3'>
                                    {showSpinner ? <span className={spinner.loader}></span> : null}
                                </div>
                    </div>
                )}

                {comments && comments.map((comment, index) => (
                    <div className={`p-3 mb-2 flex flex-col ${style.border}`} key={index}>
                        <h5 className={style.date}>{comment.createdAt.slice(0,10)}</h5>
                        <div className="flex">
                            <p className={style.comment}>{comment.comment}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-auto">
                            {Array.from({ length: MAX_STARS }).map((star, starIndex) => (
                                <span key={starIndex}>
                                    {starIndex < comment.rating ? (
                                        <AiFillStar className="text-yellow-500 text-lg" />
                                    ) : (
                                        <AiOutlineStar className="text-gray-500 text-lg" />
                                    )}
                                </span>
                            ))}
                            {userId === comment.userId && (
                                <div className="ml-auto">
                                    <button className={style.icon} onClick={() => openEditModal(comment.id, comment.comment, comment.rating)}>
                                        <img src={edit_icon} alt="x" />
                                    </button>
                                    <button className={style.icon} onClick={() => handleDeleteComment(comment.id)}>
                                        <img src={bin_icon} alt="" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Comments