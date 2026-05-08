import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router";
import { ArrowLeftIcon, PhotoIcon, TagIcon, CurrencyDollarIcon, CubeIcon, DocumentTextIcon, FolderIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/products/add", form);
            alert("Product added successfully!");
            navigate("/admin/products");
        } catch (err) {
            console.error("Error adding product:", err);
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 md:px-6 mb-12">
            {/* Header Area */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/products" className="p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-200 transition-colors text-gray-600 hover:text-blue-600">
                    <ArrowLeftIcon className="w-5 h-5 stroke-2" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Fill in the details below to add a new product to your inventory.</p>
                </div>
            </div>

            {/* Form Container */}
            <div className="bg-white p-6 md:p-8 shadow-sm rounded-2xl border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title & Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <TagIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Wireless Headphones"
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <FolderIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Electronics"
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price & Stock Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <CubeIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    placeholder="0"
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image URL & Live Preview */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <div className="relative flex-grow w-full">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <PhotoIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="url"
                                    name="image"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-2 ml-1">Provide a direct link to the product image.</p>
                            </div>

                            {/* Live Image Preview Box */}
                            <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center shadow-inner">
                                {form.image ? (
                                    <img
                                        src={form.image}
                                        alt="Preview"
                                        className="w-full h-full object-contain p-1"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-xs text-red-400 text-center px-1">Invalid Image</span>'; }}
                                    />
                                ) : (
                                    <span className="text-xs text-gray-400 font-medium">Preview</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <div className="absolute top-3.5 left-3.5 pointer-events-none">
                                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Write a detailed description of the product..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {/* <PlusIcon className="w-5 h-5 stroke-2" /> */}
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}