import { useEffect,useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { PencilSquareIcon, TrashIcon, PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await api.get("/products");
        setProducts(response.data);
    }

    const deletedProduct = async (id) => {
        try{
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully!");
            loadProducts();
        }catch(err){
            console.error("Error deleting product:", err);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return(
        <div className="max-w-6xl mx-auto mt-10 px-4 md:px-6 mb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Product List</h2>
                <Link to="/admin/products/add" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition-all font-medium flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
                    <PlusIcon className="w-5 h-5 stroke-2" />
                    Add New Product
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 shadow-sm">
                    <PhotoIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                    <p className="text-gray-500">Get started by adding a new product to your inventory.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            {/* Product Image Area */}
                            <div className="relative h-56 bg-white flex items-center justify-center overflow-hidden border-b border-gray-100 p-4">
                                {product.image ? (
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-300">
                                        <PhotoIcon className="w-12 h-12 mb-2" />
                                        <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Card Content Area */}
                            <div className="p-5 flex flex-col justify-between flex-grow">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 leading-snug" title={product.title}>{product.title}</h3>
                                    <div className="flex flex-col gap-2 mt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</span>
                                            <span className="font-bold text-lg text-blue-600">${product.price}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</span>
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-700'}`}>
                                                {product.stock} left
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
                                    <Link to={`/admin/products/edit/${product._id}`} className="flex-1 flex justify-center items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-200 outline-none">
                                        <PencilSquareIcon className="w-4 h-4 stroke-2" />
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => deletedProduct(product._id)}
                                        className="flex-1 flex justify-center items-center gap-1.5 text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors focus:ring-2 focus:ring-red-200 outline-none"
                                    >
                                        <TrashIcon className="w-4 h-4 stroke-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}