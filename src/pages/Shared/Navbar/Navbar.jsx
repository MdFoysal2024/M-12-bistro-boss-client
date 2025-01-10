import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { IoPersonCircleSharp } from "react-icons/io5";
import { AuthContext } from '../../../providers/AuthProvider';
import useCart from '../../../hooks/useCart';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    //console.log(user.email);

    const [cart] = useCart();


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }



    const navOptions = <>
        <li><Link to='/' className='hover:underline'>Home</Link></li>
        <li><Link to='/menu' className='hover:underline'>Our Menu</Link></li>
        <li><Link to='/order/salad' className='hover:underline'>Food Order</Link></li>
        <li><Link to='/dashboard/cart' className=''>
            <div className='flex'>
                <TiShoppingCart className='text-3xl' />
                <div className="badge badge-secondary">+{cart.length}</div>
            </div>

        </Link></li>
        {/* <li><Link to='/secret' className='hover:underline'>Contact US</Link></li>
        <li><Link className='hover:underline'>Dashboard</Link></li> */}
        <div>
            <button ></button>
        </div>
        {
            user ? <>
                {/* <span className=''>{user?.displayName}</span>*/}
                <button onClick={handleLogOut}
                    className="  font-bold">
                    <img className='rounded-full w-10 npm border-2 run dev' src={user?.photoURL} alt="" />
                </button>
            </> : <>
                <li> <Link to='/login'>

                    <button className='text-2xl p-2 mx-2 border-2  border-gray-500 rounded-full'><IoPersonCircleSharp /></button>
                </Link></li>
            </>
        }

    </>

    return (
        <div>
            <div className="navbar max-w-screen-xl px-8 mx-auto hover:text-opacity-100 fixed z-10  text-white bg-opacity-30 bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm bg-slate-400 dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>

                <div className="navbar-end">
                    <div className=" hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navOptions}
                        </ul>
                    </div>



                    {/* <div>
                        <button className='text-2xl p-2 mx-2 border-2 border-gray-500  rounded-full'><TiShoppingCart /></button>
                    </div>
                    <div>
                        <Link to='/login'>

                            <button className='text-2xl p-2 mx-2 border-2  border-gray-500 rounded-full'><IoPersonCircleSharp /></button>
                        </Link>
                    </div> */}


                </div>
            </div>
        </div>
    );
};

export default Navbar;