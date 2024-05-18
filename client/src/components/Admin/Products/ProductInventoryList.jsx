import React, { useState } from 'react';
import { deleteProduct } from '../../../helper/sendData';
import UpdateProductModal from './UpdateProductModal';
import { getAllProucts } from '../../../helper/getData';

const ProductInventoryList = ({ product, setProducts }) => {
    const [updateShow, setUpdateShow] = useState(false);
    const onDeleteProduct = async (id) => {
        try {
            const response = await deleteProduct(id);
            if (response.error) {
                console.error(response.error);
                return;
            }
            const newData = await getAllProucts();
            if (newData.error) {
                console.error(newData.error);
                return;
            }
            setProducts(newData.products);
            console.log(response);

        }
        catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            {updateShow && <UpdateProductModal updateShow={updateShow} setUpdateShow={setUpdateShow} id={product._id} setProducts={setProducts} />}
            <div className="product-item mb-4 sm:product-item-sm shadow-md rounded-md bg-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="image-container col-span-2 md:col-span-3">
                        <img
                            src={product?.images[0]?.url}
                            alt={product.name}
                            className="h-32 w-32 object-cover rounded-lg mr-2"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className="details col-span-10 md:col-span-9 flex flex-col justify-between">
                        <div>
                            <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="text-gray-500">${product.price}</p>
                        </div>
                        <div className="flex justify-center items-center mt-2 md:mt-0">
                            <button
                                className="btn bg-gray-200 text-gray-600 py-1 px-3 rounded-md mr-2"
                                disabled={true}> {/* Disabling stock button for now */}
                                Stock: {product.stock}
                            </button>
                            <button
                                className="btn bg-blue-500 text-white py-1 px-3 rounded-md mr-2"
                                onClick={() => setUpdateShow(true)}
                            >
                                Update Product
                            </button>
                            <button
                                className="btn bg-red-500 text-white py-1 px-3 rounded-md"
                                onClick={() => onDeleteProduct(product._id)}
                            >
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductInventoryList;
