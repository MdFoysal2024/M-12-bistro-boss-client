import { Parallax } from 'react-parallax';


const Cover = ({ bgImg, subTitle, title }) => {
    return (

        <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={bgImg}
        bgImageAlt="the menu"
        strength={-200}
    >
       

        <div
            className="hero  "
            // style={{
            //     backgroundImage: `url("${bgImg}")`,
            // }}
            >

            <div className=" bg-red-950 bg-opacity-50 mt-44 mb-24 px-24 py-12 md:p-24 text-neutral-content text-center">
                <div className=" lg:px-32">
                    <h1 className="mb-5 text-4xl md:text-7xl font-bold">{title}</h1>
                    <p className="mb-5 uppercase">
                        {subTitle}
                    </p>

                </div>
            </div>
        </div>
    </Parallax>

    );
};

export default Cover;