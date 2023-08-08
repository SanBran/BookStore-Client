import { useEffect, useState } from 'react';
import styles from './CreateBook.module.css';
import countriesData from '../Signup/data/countries.json';
import { useSelector } from 'react-redux';
import DragAndDrop from '../DragAndDropBook/DragAndDrop';
import edit_icon from '../../assets/icons/edit_icon.svg';
import delete_icon from '../../assets/icons/delete_icon.svg';
import plus_icon from '../../assets/icons/plus_icon.svg';

const CreateBook = ( ) => {
    const genericCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU";
    const genericPDF = "https://www.ingenieria.unam.mx/dcsyhfi/material_didactico/Literatura_Hispanoamericana_Contemporanea/Autores_Q/QUIROGA/gallina.pdf"

    const allGenders = useSelector(state => state.genres);
    const uniqueGenres = [];
    allGenders?.map((gender) => uniqueGenres.includes(gender.nameType)? null : uniqueGenres.push(gender.nameType) );

    // const [formData, setFormData] = useState({
    //     title: '',
    //     author: '',
    //     country: '',
    //     language: '',
    //     otherLanguage: '',
    //     image: genericCover,
    //     gender:'',
    //     newGender:'',
    //     allGenders: [],
    //     otherGender: '',
    //     sinopsis: '',
    //     price: '',
    //     publishedDate: '',
    //     pdfLink: '',
    //     editorial: '',
    //     numPages: ''
    // });
    const [formData, setFormData] = useState({
        title: 'La gallina degollada',
        author: 'Horacio Quiroga',
        country: '',
        language: '',
        otherLanguage: '',
        image: genericCover,
        gender:'',
        newGender:'',
        allGenders: [],
        sinopsis: 'Narra la historia del matrimonio Mazzini-Ferraz que parece estar maldito, ya que sus cuatro hijos varones, al llegar al año y medio, sufren convulsiones que los dejan muy disminuidos mentalmente y con una virtualmente nula capacidad de razonar. El quinto hijo, una niña, nace y crece sin mayores problemas y con una capacidad mental normal. Un día los hermanos ven con detenimiento como una gallina es degollada y luego cocinada para la cena. Este hecho, en apariencia simple, desata de manera imprevisible una tragedia. Los hermanos deciden replicar el acto atroz que acaban de presenciar y utilizan a su hermanita para aquello.',
        price: '100',
        publishedDate: '1904',
        pdfLink: genericPDF,
        editorial: 'Editorial Fuego Azul',
        numPages: '7'
    });
    const [errors, setErrors] = useState({
        title: '',
        author: '',
        country: '',
        language: '',
        otherLanguage: '',
        image: '',
        gender: [],
        newGender:'',
        sinopsis: '',
        price: '',
        publishedDate: '',
        pdfLink: '',
        editorial: '',
        numPages: ''
    })
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        //console.log(property, value);
        setFormData({ ...formData, [property]: value });
        
        //--Validar los inputs cuando se hacen cambios
        //validateInputs({ ...formData, [property]: value }, property)
      };

      const addGender =(event)=>{
        event.preventDefault();
        if(formData.gender === 'other' && formData.newGender !=='' && !formData.allGenders.includes(formData.newGender)){
            setFormData({...formData, allGenders:[...formData.allGenders, formData.newGender], newGender:''});
        }
        else if(formData.gender !== '' && formData.gender !=='none' && formData.gender !=='other' && !formData.allGenders.includes(formData.gender)){
            setFormData({...formData, allGenders:[...formData.allGenders, formData.gender]});
        }
    }
    const removeGender=(index)=>{
        const deleteGender = [...formData.allGenders];
        deleteGender.splice(index, 1);
        setFormData({...formData, allGenders:deleteGender});
    }

    //----Subir imagen del libro
    const user = useSelector(state=>state.userDetail)
    const updateImg = (img)=>{
        console.log(img); 
        setFormData({...formData, image:img})
    }
      

    return(
        <form className={styles.form}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={formData.image !== '' ? formData.image : genericCover} alt="libro" />
                <div className={styles.DragAndDrop}>
                <img className={styles.edit} src={edit_icon} alt="edit" />
                <DragAndDrop user={user} updateImg={updateImg}/>
                </div>
            </div>

            <div className={styles.inputsContainer}>
            <label className={styles.label} >
                <h3><img className={styles.plusIcon} src={plus_icon} alt="+" /> ADD PDF</h3>
                <input
                    className={errors.pdfLink.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="pdfLink"
                    onChange={handleChange}
                    value={formData.pdfLink}
                    type="text"
                    placeholder=""
                    required
                />
            </label>
            {errors.pdfLink.length ? <p className={styles.textError}>{errors.pdfLink}</p> : <></>}

            <label className={styles.label}>
                <input
                    className={errors.title.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    type="text"
                    placeholder="Title"
                    required
                />
            </label>
            {errors.title.length ? <p className={styles.textError}>{errors.title}</p> : <></>}

            <label className={styles.label}>
                <input
                    className={errors.author.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="author"
                    onChange={handleChange}
                    value={formData.author}
                    type="text"
                    placeholder="author"
                    required
                />
            </label>
            {errors.author.length ? <p className={styles.textError}>{errors.author}</p> : <></>}

            <label className={styles.label}>
                <input
                    className={errors.editorial.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="editorial"
                    onChange={handleChange}
                    value={formData.editorial}
                    type="text"
                    placeholder="editorial"
                    required
                />
            </label>
            {errors.editorial.length ? <p className={styles.textError}>{errors.editorial}</p> : <></>}

            <label className={styles.label} >
                <h3>Price $</h3>
                <input
                    className={errors.price.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="price"
                    onChange={handleChange}
                    value={formData.price}
                    type="number"
                    placeholder=""
                    required
                />
            </label>
            {errors.price.length ? <p className={styles.textError}>{errors.price}</p> : <></>}

            <select
                name="country"
                className={errors.country.length ? (`${styles.input} ${styles.select} ${styles.error}`) : (`${styles.input} ${styles.select}`)}
                onChange={handleChange}
            >
                <option value={"none"}>Select a country</option>
                {countriesData.map((country) => {
                return <option key={country.name} value={country.name}>{country.name}</option>
                })}
            </select>
            {errors.country.length ? <p className={styles.textError}>{errors.country}</p> : <></>}

            <label className={styles.label}>
                <select
                name="gender"
                className={errors.gender.length ? (`${styles.input} ${styles.select} ${styles.error}`) : (`${styles.input} ${styles.select}`)}
                //onChange={(event)=>{handleChangeGender(event.target.value, null)}
                onChange={handleChange}
                >
                <option value={"none"}>Select a genre</option>
                <option value={"other"}>Other gender</option>
                {uniqueGenres.map((gender) => {
                return <option key={gender} value={gender}>{gender}</option>
                })}
                </select>
                {formData.gender === "other"
                ?(<input
                    className={errors.newGender.length ? (`${styles.input} ${styles.otherInput} ${styles.error}`) : (`${styles.input} ${styles.otherInput}`)}
                    name="newGender"
                    onChange={handleChange}
                    value={formData.newGender}
                    type="text"
                    placeholder="New genre"
                    required
                />):(<></>)}

                <button onClick={addGender}>
                    <img className={styles.plusIcon} src={plus_icon} alt="+" />
                </button>
            </label>

            <div className={styles.gendersContainer}>
                {formData.allGenders.map((genderValue, index)=>(<div className={styles.genderContainer} key={genderValue}>
                    {genderValue}
                    <img src={delete_icon} alt='x' onClick={()=>{removeGender(index)}}/>
                </div>))}
            </div>

            <label className={styles.label}>
                <select
                    name="language"
                    className={errors.language.length ? (`${styles.input} ${styles.select} ${styles.error}`) : (`${styles.input} ${styles.select}`)}
                    onChange={handleChange}
                >
                    <option value={"none"}>Select a language</option>
                    <option value={"ES"}>Spanish</option>
                    <option value={"EN"}>English</option>
                    <option value={"other"}>Other</option>
                </select>
                {formData.language === "other"
                ?(
                    <input
                        className={errors.otherLanguage.length ? (`${styles.input} ${styles.otherInput} ${styles.error}`) : (`${styles.input} ${styles.otherInput}`)}
                        name="otherLanguage"
                        onChange={handleChange}
                        value={formData.otherLanguage}
                        type="text"
                        placeholder="Other language"
                        required
                    />
                )
                :(<></>)
                }
            </label>
            {errors.language.length ? <p className={styles.textError}>{errors.language}</p> : <></>}

            <label className={styles.label}>
                <textarea
                    className={errors.sinopsis.length ? (`${styles.input} ${styles.textarea} ${styles.error}`) : (`${styles.input} ${styles.textarea}`)}
                    name="sinopsis"
                    onChange={handleChange}
                    value={formData.sinopsis}
                    placeholder="Synopsis"
                    required
                />
            </label>
            {errors.sinopsis.length ? <p className={styles.textError}>{errors.sinopsis}</p> : <></>}

            <label className={styles.label} >
                <h3>Published date</h3>
                <input
                    className={errors.publishedDate.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="publishedDate"
                    onChange={handleChange}
                    value={formData.publishedDate}
                    type="text"
                    placeholder=""
                    required
                />
            </label>
            {errors.publishedDate.length ? <p className={styles.textError}>{errors.publishedDate}</p> : <></>}

            <label className={styles.label}>
                <h3>Num. of pages</h3>
                <input
                    className={errors.numPages.length ? (`${styles.input} ${styles.error}`) : styles.input}
                    name="numPages"
                    onChange={handleChange}
                    value={formData.numPages}
                    type="number"
                    placeholder=""
                    required
                />
            </label>
            {errors.numPages.length ? <p className={styles.textError}>{errors.numPages}</p> : <></>}


            </div>
            <button className={styles.createBtn}>CREATE BOOK</button>
        </form>
    )

};

export default CreateBook;