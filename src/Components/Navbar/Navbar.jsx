import {Link} from 'react-router-dom';

const Navbar= ()=>{
return(
    <nav>
        <div>
<Link to='/home'> Wanna go to the main books????</Link>
        </div>

        <div>
            <Link to='/settings'> Let have some settings, shall we?</Link>
        </div>

<div>
    <Link to='/profile'> See your profile here </Link>
</div>
        <div>
            <Link to='/login'> Want to log out?</Link>
        </div>
    </nav>
)
}

export default Navbar;