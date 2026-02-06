import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../redux/productReducer";
import { useDispatch } from "react-redux";

// product creation related constants and component
const Sex = ["Male", "Female"];
const Month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const c_Date = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const Year = ["1900"];
const BRANDS = ["TechNova", "Apple", "Samsung", "OnePlus"];
const CATEGORIES = {
    Electronics: ["Mobile Phones", "Laptops", "Accessories"],
    Appliances: ["Kitchen", "Home"],
};
const DELIVERY_OPTIONS = [
    "1-2 Business Days",
    "2-4 Business Days",
    "5-7 Business Days",
];

export default function CreateProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: "",
        /*lastname: "",
        sex: "",
        month: "",	
        date: "",	
        year: "",
        address: "",
        phnumber: "",
        emailid: "",*/
        brand: "",
        category: "",
        subCategory: "",
        price: "",
        discountPercentage: "",
        stock: "",
        description: "",
        highlights: [""],
        specifications: {},
        warranty: "",
        deliveryEstimate: "",
        tags: [],
    });
    const [errors, setErrors] = useState({});

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // handle highlights change
    const handleHighlightChange = (index, value) => {
        const updated = [...product.highlights];
        updated[index] = value;
        setProduct({ ...product, highlights: updated });
    };
    const addHighlight = () => setProduct({ ...product, highlights: [...product.highlights, ""] });

    // handle specifications change
    const handleSpecChange = (key, value) => {
        setProduct({
            ...product,
            specifications: { ...product.specifications, [key]: value },
        });
    };

    // calculate discounted price
    const discountedPrice = product.price && product.discountPercentage
        ? (
            product.price -
            (product.price * product.discountPercentage) / 100
        ).toFixed(2)
        : product.price;

    // form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        const payload = {
            ...product,
            price: Number(product.price),
            discountPercentage: Number(product.discountPercentage),
            discountedPrice: Number(discountedPrice),
            stock: Number(product.stock),
            availabilityStatus:
                product.stock > 0 ? "In Stock" : "Out of Stock",
            rating: 0,
            reviewCount: 0,
            createdAt: new Date().toISOString(),
        };

        // call API to create product (to be implemented)
        dispatch(createNewProduct(payload));

        console.log("CREATE PRODUCT PAYLOAD", payload);
        //navigate("/products");
        
    };
    const inputClass = "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                Add Employee Details
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 space-y-10"
            >

                {/* BASIC INFO */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Basic Information of Employee
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium mb-1">Employee First Name</label>
                            <input
                                name="name"
                                placeholder="Employee First Name"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Employee Last Name</label>
                            <input
                                name="lastname"
                                placeholder="Employee Last Name"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Sex</label>
                        <select
                            name="s_sex"
                            className={inputClass}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Sex</option>
                            {Sex.map((b) => (
                                <option key={b}>{b}</option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">DOB</label>
                        <select
                            name="month"
                            className={inputClass}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Month</option>
                            {Month.map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                        <select
                            name="s_date"
                            className={inputClass}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Date</option>
                            {c_Date.map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                        <select
                            name="s_year"
                            className={inputClass}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Year</option>
                            {Year.map((b) => (
                                <option key={b}>{b}</option>
                            ))}

                        </select>
                    </div>
                </section>

                {/* Communication details */}
                <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Communication details
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                        {/*Control product pricing and availability*/}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Address (#)</label>
                            <input
                                name="address"
                                placeholder="Address"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                            <label className="block text-sm font-medium mb-1">Phone number (#)</label>
                            <input
                                name="phnumber"
                                type="number"
                                placeholder="Phone number"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />
                            <label className="block text-sm font-medium mb-1">Email Id</label>
                            <input
                                name="emailid"
                                type="email"
                                placeholder="Email Id"
                                className={inputClass}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                </section>

                {/* DESCRIPTION */}
                <section>

                    <label className="block text-sm font-medium mb-1">
                        Add on Information
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Add on Information of the employee..."
                        className={inputClass}
                        onChange={handleChange}
                        required
                    />

                    <div className="mt-5 space-y-3">

                    </div>
                </section>


                {/* ACTIONS */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="px-6 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                        Clear
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
}