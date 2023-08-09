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


    console.log(userId);


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
        <div>
            <div>
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Editar Comentario"
                >
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
                        <textarea
                            className="w-full p-2 bg-white mb-2"
                            value={commentToEdit.comment}
                            onChange={(e) =>
                                setCommentToEdit({
                                    ...commentToEdit,
                                    comment: e.target.value
                                })
                            }
                            rows="3"
                        />
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
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="mr-2 px-4 text-white hover:bg-gray-600 py-2 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditComment}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                            >
                                Update Comment
                            </button>
                        </div>
                    </div>
                </Modal>


                {!loggedIn
                    ? <div>
                        <h2>Log In to leave a comment</h2>
                        <Link to={'/access'} >Here</Link>
                    </div>
                    :
                    <div >
                        <form onSubmit={handleSubmit} className="p-4 bg-gray-200 rounded-lg shadow-md ">

                            <h3 className="text-lg font-semibold mb-2">
                                Leave a comment <PiPencilLineBold className="ml-2 h-6 w-6" />
                            </h3>

                            <textarea
                                value={form.comment}
                                name="comment"
                                onChange={handleChange}
                                className=""
                                cols='70'
                                rows="3"
                                placeholder="What do you think of the book?"
                            />

                            <div className="flex items-center space-x-2 mb-2">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <span
                                        key={index}
                                        onClick={() => setRating(index)}
                                        className="cursor-pointer"
                                    >
                                        {index <= rating ? <AiFillStar className="text-yellow-500 h-5 w-5 text-lg" /> : <AiOutlineStar className="text-lg text-gray-400 h-5 w-5" />}
                                    </span>
                                ))}
                            </div>

                            <input
                                disabled={form.comment.length < 1}
                                type="submit"
                                value="Send"
                                className={`py-2 px-4 rounded-md text-white ${form.comment.length < 1
                                    ? "bg-gray-400  hover:cursor-not-allowed opacity-70"
                                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors"
                                    }`}
                            />

                            <div className='mt-3'>
                                {showSpinner ? <span className={spinner.loader}></span> : null}
                            </div>
                        </form>

                    </div>
                }

            </div>
            {comments && comments.map((comment, index) => (
                <div className="bg-gray-300 p-3 mb-2 flex flex-col" key={index}>
                    <div className="flex">
                        <p className="text-gray-800 font-semibold">{comment.comment}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-auto">
                        {Array.from({ length: MAX_STARS }).map((star, starIndex) => (
                            <span key={starIndex}>
                                {starIndex < comment.rating ? <AiFillStar className="text-yellow-500 text-lg" /> : <AiOutlineStar className="text-gray-500 text-lg" />}
                            </span>
                        ))}
                        {userId === comment.userId && (
                            <div className="ml-auto">
                                <button className="mr-2 text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => openEditModal(comment.id, comment.comment, comment.rating)}>
                                    <BiSolidRename />
                                </button>
                                <button className="hover:text-red-600 cursor-pointer" onClick={() => handleDeleteComment(comment.id)}>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments