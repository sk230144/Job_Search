import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductByIdAsync, selectProductById } from '../productSlice.js';
import { fetchProductsById } from '../productAPI.js';
import { addToCartAsync, selectItems } from '../../cart/cartSlice.js';
import { selectLoggedInUser } from '../../auth/authSlice.js'
import { discountedPrice } from '../../../app/constants.js';
import { useAlert } from "react-alert";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const user = useSelector(selectLoggedInUser);
    const product = useSelector(selectProductById);
    const dispatch = useDispatch();
    const params = useParams();
    const items = useSelector(selectItems);
    const alert = useAlert();

    const handleCart = (e) => {
        e.preventDefault();
            const newItem = {  ...product, quantity: 1, user: user.id }
            delete newItem['id'];
            dispatch(addToCartAsync(newItem));
    }



    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id));
    }, [dispatch, params.id]);



    return (
        <div className="bg-white">
            {product && (

                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {product.title}
                                </a>
                            </li>
                        </ol>
                    </nav>

                     
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="mx-7 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Company: {product.images}</h1>
                        </div>
                    

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl  tracking-tight text-gray-900">Job Type: {product.price}</p>
                            <p className="text-3xl tracking-tight text-gray-900"> {product.discountedPrice}</p>

                            {/* Reviews */}

                            <form className="mt-10">
                            <button
                            onClick={handleCart}
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Apply For See It
                                    </button>

                                <Link to="/checkout">
                                    <button
                                        type="submit"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Apply For Job
                                    </button>
            
                                </Link>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights && product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">How to apply</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.stock}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>
    )
}