import MenuItem from "../../Shared/ManuItem/MenuItem";


const MenuCategory = ({ items }) => {
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

                <button className='btn text-xl   border-0 border-b-4 border-orange-600 hover:text-orange-600 hover:border-2 '>ORDER YOUR FAVOURITE FOOD</button>
            </div>





        </div>
    );
};

export default MenuCategory;

