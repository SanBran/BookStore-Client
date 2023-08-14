import style from './Empty.module.css';

import errorImg from '../../assets/icons/NotFound.svg'

const Empty = ()=>{
    return(
        <div className={style.container}>
                <img className={style.img} src={errorImg} alt="404IMG" />
                <div className={style.textContainer}>
                    <h1 className={style.title}>Empty</h1>
                    <h5 className={style.subtitle}>404 error</h5>
            </div>
        </div>
    )
};

export default Empty;
