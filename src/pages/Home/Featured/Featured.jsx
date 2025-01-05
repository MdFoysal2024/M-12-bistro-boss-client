import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import bg_Image from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <section className=" text-white  bg-fixed featured-item   "


        >


            <div className="bg-red-950 p-24 bg-opacity-50">

                <SectionTitle
                    heading={'From Our Menu'}
                    subHeading={'Check it out'}
                ></SectionTitle>



                <div className="md:flex gap-16 justify-center items-center">
                    <div>
                        <img src={featuredImg} alt="" />
                    </div>
                    <div className="space-y-4 text-white">
                        <p className="font-medium">March 20, 2023</p>
                        <p className="font-medium">WHERE CAN I GET SOME?</p>
                        <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo eaque perferendis suscipit similique reprehenderit quibusdam asperiores! Expedita, porro voluptatem? Odit, commodi quibusdam maiores rerum hic sint reiciendis similique, est quia tempora veritatis molestias sed.</p>
                        <button className="uppercase  p-2 rounded-lg font-bold border-b-2  border-white">Read More</button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Featured;