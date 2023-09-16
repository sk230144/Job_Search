import { useForm } from "react-hook-form";
import React, { Fragment, useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from '../features/cart/cartSlice.js';
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice.js";
import { selectUserInfo } from "../features/user/userSlice.js";
import { discountedPrice } from "../app/constants.js";
import { selectLoggedInUser, updateUserAsync } from "../features/auth/authSlice.js";


const Checkout = () => {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder)

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // const user = useSelector(selectLoggedInUser);


  // We use here updateItem but in tutorial it have use updateCart

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };


  //////////////////////////////////////////////////////////////////////

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }


  const handleAddress = (e) => {
    console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value])
  }
  const handlePayment = (e) => {
    console.log(e.target.value)
    setPaymentMethod(e.target.value);
  }




  const handleOrder = (e) => {
    const order = { items, user, paymentMethod, selectedAddress, status: 'pending' }
    dispatch(createOrderAsync(order))
    setPaymentMethod(e.target.value);
  }

  return (


    <>

      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`}
        replace={true}></Navigate>}
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
          <div className='lg:col-span-3'>
            <form className='bg-white px-5 py-5 mt-12'
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data)
                dispatch(
                  updateUserAsync({ ...user, addresses: [...user.addresses, data] })
                );
                reset();
              })}
            >
              <div className='space-y-12'>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', { required: 'name is required' })}
                          id="name"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>



                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email', { required: 'email is required' })}
                          type="email"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register('phone', { required: 'phone is required' })}
                          type="tel"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover Letter Note
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', { required: 'street is required' })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', { required: 'city is required' })}
                          id="city"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', { required: 'state is required' })}
                          id="state"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('pinCode', { required: 'pinCode is required' })}
                          id="pinCode"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing address.
                  </p>



                  {/* ///////////////////////////////////////////////////////////////////////////// */}

                  <ul role="list">
                    {user.addresses.map((address, index) => (
                      <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-400">
                        <div className="flex gap-x-4">
                          <input
                            onChange={handleAddress}
                            name='address'
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                          <p className="text-sm leading-6 text-gray-900">{address.city}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* ////////////////////////////////////////////////////////////////////////////////// */}

                  <div className="mt-10 space-y-10">
                  </div>
                </div>
              </div>



            </form>
          </div>
          <div className='lg:col-span-2'>











            {/* Cart Part */}







            <div className="mx-auto my-20 mt-10  max-w-7xl px-4 sm:px-6 lg:px-8">
              
              <div className="mt-6">
                <div
                  onClick={handleOrder}
                  className=" cursor-pointer  flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Apply Now
                </div>
              </div>

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      More Jobs
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>

            </div>



          </div>
        </div>
      </div>


    </>

  )
}

export default Checkout
