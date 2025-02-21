

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='w-1/2 md:w-6/12 mx-auto  text-center'>
            <p className='text-orange-500'>---{subHeading}---</p>
            <h2 className=' text-3xl md:text-4xl font-bold py-6 my-8 border-y-4 '>{heading}</h2>
        </div>
    );
};

export default SectionTitle;