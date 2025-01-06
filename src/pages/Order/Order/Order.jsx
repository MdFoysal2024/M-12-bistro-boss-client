import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import bgImg from "../../../assets/shop/banner2.jpg";

{/* Using React Tabs */ }
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {

{/* <Tab>salad</Tab>
                                <Tab>pizza</Tab>
                                <Tab>soup</Tab>
                                <Tab>dessert</Tab>
                                <Tab>drinks</Tab> */}



    // created a categories array for select dynamic food tabs
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams()
    // console.log(category)
    //category---------->
    const initialIndex = categories.indexOf(category)
    console.log(initialIndex)
    //initialIndex------->
    const [tabIndex, setTabIndex] = useState(initialIndex);


    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Food Order</title>
            </Helmet>
            <Cover
                bgImg={bgImg}
                title={'FOOD ORDER'}
                subTitle={'Would you like to try a dish?'}
            ></Cover>

            {/* Order Section Start */}
            <section className=" my-8">
                {/* <div>
                    <div role="tablist" className="tabs w-[500px] font-bold mx-auto tabs-bordered">
                        <a role="tab" className="tab  tab-active">SALAD</a>
                        <a role="tab" className="tab">PIZZA</a>
                        <a role="tab" className="tab">SOUPS</a>
                        <a role="tab" className="tab">DESSERTS</a>
                        <a role="tab" className="tab">DRINKS</a>
                    </div>
                </div> */}



                {/* Using React Tabs */}
                <div className="flex justify-center mt-8">

                    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        <div className="flex justify-center mt-8">
                            <TabList>
                                <Tab>salad</Tab>
                                <Tab>pizza</Tab>
                                <Tab>soup</Tab>
                                <Tab>dessert</Tab>
                                <Tab>drinks</Tab>

                            </TabList>
                        </div>

                        <TabPanel>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                                {
                                    salad.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                    ></FoodCard>)
                                }
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                                {
                                    pizza.map(item => <FoodCard
                                        key={item._id}
                                        item={item}
                                    ></FoodCard>)
                                }
                            </div>
                        </TabPanel>

                        {/* নিচের 3টার ডাটা লোড/map করা হয়েছে OrderTab কম্পোনেন্ট এর ভিতরে const soup = menu.filter(item => item.category === 'soup') এর items={soup} কে প্রপ হিসাবে পাঠিয়ে */}

                        <TabPanel>
                            <OrderTab
                                items={soup}
                            ></OrderTab>
                        </TabPanel>

                        <TabPanel>
                            <OrderTab
                                items={dessert}
                            ></OrderTab>
                        </TabPanel>

                        <TabPanel>
                            <OrderTab
                                items={drinks}
                            ></OrderTab>
                        </TabPanel>

                    </Tabs>
                </div>






            </section>
        </div>
    );
};

export default Order;