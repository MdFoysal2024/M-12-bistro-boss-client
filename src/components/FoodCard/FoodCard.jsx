

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, category } = item || {};


    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
               

                <figure className="px-10 pt-10">
                    <img
                        src={image}
                        alt="Shoes"
                        className="" />
                </figure>

                <p className="bg-orange-600 absolute px-2 right-0 mt-12 mr-12   text-center  text-white font-bold">${price}</p>
           
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                    <button className='btn text-xl   border-0 border-b-4 border-orange-600 hover:text-orange-600 bg-orange-100 text-orange-600 hover:border-2 '>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;