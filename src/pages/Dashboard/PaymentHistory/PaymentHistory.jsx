import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const PaymentHistory = () => {



    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();



    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })




    return (
        <div className='p-12'>

            <SectionTitle
                heading={'PAYMENT HISTORY'}
                subHeading={'At a Glance!'}
            ></SectionTitle>
            <div className='flex justify-start pt-16 pb-4'>
                <h2 className='text-2xl font-bold uppercase'> Total Payment: ({payments.length})</h2>
            </div>




            <div className="overflow-x-auto my-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white ">
                        <tr className="">
                            <th className="pl-6">
                                #
                            </th>
                            <th>Email</th>
                            <th>Food Category</th>
                            <th>Transaction ID</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>



                        {
                            payments.map((payment, idx) => <tr key={payment._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <p>{user.email}</p>
                                </td>
                                <td>
                                    <p className="font-bold">

                                        Food Category
                                    </p>

                                </td>
                                <td>
                                    <p className="font-bold">

                                       {payment.transactionId}
                                    </p>

                                </td>
                                <td>
                                    <p>${payment.price}</p>

                                </td>
                                <td>
                                    <p className='text-red-600 py-1  rounded-lg px-4 text-center bg-red-200 font-semibold'>{payment.status}</p>

                                </td>

                                <th>
                                   <p>{payment.data}</p>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;