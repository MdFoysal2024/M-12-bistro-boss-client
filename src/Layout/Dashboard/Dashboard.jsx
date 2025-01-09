
import { FaHome } from 'react-icons/fa';
import { FaBookBookmark, FaCalendar, FaRecordVinyl } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFoodBank } from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Dashboard = () => {

const [cart] = useCart();



    return (
        <div className='flex'>

            {/* Side Bar Menu section */}
            <div className='w-64 min-h-screen bg-amber-600 '>
                <div className='text-center py-12 text-white'>
                    <h3 className='text-2xl font-bold'>BISTRO BOSS</h3>
                    <p className='uppercase'>Restaurant</p>
                </div>

                <ul className='menu font-semibold '>
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




                    <div className="divider px-6"></div>

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