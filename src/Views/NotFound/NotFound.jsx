import style from './NotFound.module.css';

import errorImg from '../../assets/icons/NotFound.svg'

const NotFound = ()=>{
    return(
        <div className={style.container}>
                <img className={style.img} src={errorImg} alt="404IMG" />
                <div className={style.textContainer}>
                    <h1 className={style.title}>404 error</h1>
                    <h5 className={style.subtitle}>page not found</h5>
            </div>
        </div>
    )
};

export default NotFound;
