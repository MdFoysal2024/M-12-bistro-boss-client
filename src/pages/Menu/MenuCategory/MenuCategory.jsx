import { Link } from "react-router-dom";
import MenuItem from "../../Shared/ManuItem/MenuItem";


const MenuCategory = ({ items, title }) => {
    //{ items, title }------> props are coming from Menu.jsx
    return (
        <div>

            <div className='grid grid-cols-1 mt-12  md:grid-cols-2 gap-12'>
                {
                    items.slice(0, 6).map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>

            <div className='flex justify-center pt-12'>
                <Link to={`/order/${title}`}>

                    <button className='btn text-xl bg-orange-100  border-0 border-b-4 border-orange-600 hover:text-orange-600 hover:border-2 '>ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>





        </div>
    );
};

export default MenuCategory;

