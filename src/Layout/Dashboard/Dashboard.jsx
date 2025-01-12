
import { FaHome, FaList, FaUsers } from 'react-icons/fa';
import { FaBookBookmark, FaCalendar, FaRecordVinyl } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdBookmarks, MdFoodBank } from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { IoIosContacts } from 'react-icons/io';
import { ImSpoonKnife } from 'react-icons/im';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {

    const [cart] = useCart();

    //TODO: get isAdmin value from the database
    // const isAdmin = true;
     const [isAdmin] = useAdmin();


    return (
        <div className='flex'>

            {/* Side Bar Menu section */}
            <div className='w-64 min-h-screen bg-amber-600 '>
                <div className='text-center py-12 text-white'>
                    <h3 className='text-2xl font-bold'>BISTRO BOSS</h3>
                    <p className='uppercase'>Restaurant</p>
                </div>

                <ul className='menu font-semibold '>

                    {
                        isAdmin ?
                            <>

                                <li>
                                    <NavLink to="/dashboard/adminHome">   <FaHome className='text-2xl' /> Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems">   <ImSpoonKnife className='text-2xl' /> Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">   <FaList className='text-xl' />Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">   <MdBookmarks className='text-xl' />Manage Bookings</NavLink>
                                </li>
                               
                                <li>
                                    <NavLink to="/dashboard/users">   <FaUsers className='text-2xl' />All Users</NavLink>
                                </li>
                                
                            </>

                            :

                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">   <FaHome className='text-2xl' /> User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">   <FaCalendar className='text-2xl' /> Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">   <TiShoppingCart className='text-2xl' /> My Cart({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">   <FaRecordVinyl className='text-2xl' />Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">   <FaBookBookmark className='text-2xl' /> My Bookings</NavLink>
                                </li>
                            </>
                    }





                    <div className="divider px-6"></div>
                    {/* -----------Shared nav links-------------- */}
                    {/* Main Routes Section */}
                    <li>
                        <NavLink to="/">   <FaHome className='text-2xl' /> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu">   <GiHamburgerMenu className='text-2xl' /> Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">   <MdFoodBank className='text-2xl' /> Food Order</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">   <IoIosContacts className='text-2xl' /> Contact Us</NavLink>
                    </li>

                </ul>

            </div>




            {/* Dashboard Content Routes section */}
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default Dashboard;