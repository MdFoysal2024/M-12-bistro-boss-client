import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {

    const location = useLocation();
    console.log(location);

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp') 

    return (
        <div>
            {/* noHeaderFooter এর ভিতরে যদি 'login'/'signUp' কে পায় তাহলে || এর পরে 
            <Navbar ></Navbar> ও <Footer></Footer> কে নিবে না  অর্থাৎ */}
            {noHeaderFooter || <Navbar ></Navbar>}

            <div className='min-h-[calc(100vh-246px)]  '>
                <Outlet>

                </Outlet>
            </div>

            {noHeaderFooter || <Footer></Footer>}

        </div>
    );
};

export default Main;