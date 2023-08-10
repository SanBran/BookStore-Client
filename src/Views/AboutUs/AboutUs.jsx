import gif3 from '../../assets/gifs/gif3.gif';
import gif4 from '../../assets/gifs/gif4.gif';
import gif5 from '../../assets/gifs/gif5.gif';
import gif6 from '../../assets/gifs/gif6.gif';
import gif7 from '../../assets/gifs/gif7.gif';
import gif8 from '../../assets/gifs/gif8.gif';
import gif9 from '../../assets/gifs/gif9.gif';
import gif10 from '../../assets/gifs/gif10.gif';
import gif11 from '../../assets/gifs/gif11.gif';
import gif12 from '../../assets/gifs/gif12.gif';
import gif13 from '../../assets/gifs/gif13.gif';

import git from '../../assets/gifs/git_logo.png';
import css_logo from '../../assets/gifs/css_logo.png';
import express_logo from '../../assets/gifs/express_logo.png';
import github_logo from '../../assets/gifs/github_logo.png';
import js_logo from '../../assets/gifs/js_logo2.png';
import node_logo from '../../assets/gifs/node_logo.png';
import react_logo from '../../assets/gifs/react_logo.png';
import sequelize_logo from '../../assets/gifs/sequelize_logo.png';
import sql_logo from '../../assets/gifs/sql_logo.png';
import ts_logo from '../../assets/gifs/ts_logo.png'
import JoseImage from './Img/Jose.jpeg'
import styles from './AboutUs.module.css'
import SashaImage from './Img/sasha2.jpeg'
import DanyImage from './Img/dany.jpeg'
import NazaImage from './Img/naza.jpeg'
import BranImage from './Img/bran.jpeg'
import SantiImage from './Img/santi.jpeg'
import Github from './icon/code.png'
import Linkedin from './icon/linkedin.png'
import AleImage from './Img/ale.jpeg'
import EnzoImage from './Img/enzo.jpeg'
const AboutUs = ()=>{
    const teamMembers = [
        { name: 'Jose Fuenmayor', image: JoseImage , github: 'https://github.com/JoseAlbertoFC', linkedin: 'https://www.linkedin.com/in/josealbertofc/'},
        { name: 'Sasha Camargo', image: SashaImage , github: 'https://github.com/sashacamar', linkedin: ''},
        { name: 'Danny Ruiz', image: DanyImage  , github: 'https://github.com/JuanDanielRuiz', linkedin: 'https://www.linkedin.com/in/danny-ruiz-9b7a24175/'},
        { name: 'Nazareno Lujan', image: NazaImage , github: 'https://github.com/OmarnLujan', linkedin: 'https://www.linkedin.com/in/omar-nazareno-lujan-8b09b0268/'},
        { name: 'Brandon Galarza', image: BranImage , github: 'https://github.com/SanBran', linkedin: 'https://www.linkedin.com/in/brandon-galarza-a46421120'},
        { name: 'Santiago Soto', image: SantiImage , github: 'https://github.com/SH-ur', linkedin: 'http://linkedin.com/in/santiago-soto-43ab99260'},
        { name: 'Alejandro Aranguren', image: AleImage , github: 'https://github.com/larangur', linkedin: 'https://www.linkedin.com/in/larangurcol/'},
        { name: 'Enzo Magurno', image: EnzoImage , github: 'https://github.com/EnzoMagurno', linkedin: 'https://www.linkedin.com/in/enzomagurno'},
        
        
        
        
    ];
    return(
        <div className={styles.container}>
           
            
            {
                teamMembers.map((member, index) => {
                    return (
                
                        <div key={index} className={styles.card}>
                              
                            <img className={styles.img_user} src={member.image} alt="img" />
                            <div className={styles.icons}>
                            <img className={`${styles.icon} ${styles.time1}`} src={git} alt="" />
                            <img className={`${styles.icon} ${styles.time2}`} src={css_logo} alt="" />
                            <img className={`${styles.icon} ${styles.time3}`} src={github_logo} alt="" />
                            <img className={`${styles.icon} ${styles.time4}`} src={js_logo} alt="" />
                            <img className={`${styles.icon} ${styles.time5}`} src={sequelize_logo} alt="" />
                            <img className={`${styles.icon} ${styles.time6}`} src={ts_logo} alt="" />
                            <img className={`${styles.icon} ${styles.time7}`} src={express_logo} alt="" />
                            </div>
                            
                            <div className={styles.title}>
                                <div>
                                    <a href={member.github} target="_blank" class={styles.github}>
                                    <img src={Github} alt="Imagen" class={styles.image} />
                                    </a>
                                    <a href={member.linkedin} target="_blank" class={styles.github}>
                                    <img src={Linkedin} alt="Imagen" class={styles.image} />
                                    </a>
                                </div>
                                <div>
                                    <h1 className={styles.name}>{member.name}</h1>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
            {/* <div className={styles.names}>
                <h1 className={styles.name1}>Alejandro</h1>
                <h1 className={styles.name1}>Santiago</h1>
                <h1 className={styles.name1}>Daniel</h1>
                <h1 className={styles.name1}>Enzo</h1>
                <h1 className={styles.name1}>Jose</h1>
                <h1 className={styles.name1}>Sasha</h1>
                <h1 className={styles.name1}>Brandon</h1>
                <h1 className={styles.name1}>Nazareno</h1>
            </div> */}
            {/* <img className={styles.gif} src={gif3} alt="" />
            <div >
                <img className={`${styles.icon} ${styles.time1}`} src={git} alt="" />
                <img className={`${styles.icon} ${styles.time2}`} src={css_logo} alt="" />
                <img className={`${styles.icon} ${styles.time3}`} src={github_logo} alt="" />
                <img className={`${styles.icon} ${styles.time4}`} src={js_logo} alt="" />
                <img className={`${styles.icon} ${styles.time5}`} src={sequelize_logo} alt="" />
                <img className={`${styles.icon} ${styles.time6}`} src={ts_logo} alt="" />
                <img className={`${styles.icon} ${styles.time7}`} src={express_logo} alt="" />
            </div> */}
        </div>
    )
}

export default AboutUs;