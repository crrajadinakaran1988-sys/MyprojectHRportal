import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, fetchProductById, updateExistingProduct } from "../../redux/productReducer";

/* constants */
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

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct, loading } = useSelector((state) => ({
    selectedProduct: state.product.items.find((item) => item.id === id),
    loading: state.product.loading,
  }));

  const [product, setProduct] = useState(null);

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  /* ---------- PREFILL FORM ---------- */
  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        ...selectedProduct,
        highlights: selectedProduct.highlights || [""],
        specifications: selectedProduct.specifications || {},
      });
    }
  }, [selectedProduct]);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...product.highlights];
    updated[index] = value;
    setProduct({ ...product, highlights: updated });
  };

  const addHighlight = () =>
    setProduct({ ...product, highlights: [...product.highlights, ""] });

  const handleSpecChange = (key, value) => {
    setProduct({
      ...product,
      specifications: { ...product.specifications, [key]: value },
    });
  };

  const discountedPrice =
    product?.price && product?.discountPercentage
      ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
      : product?.price;

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      price: Number(product.price),
      discountPercentage: Number(product.discountPercentage),
      discountedPrice: Number(discountedPrice),
      stock: Number(product.stock),
      availabilityStatus:
        product.stock > 0 ? "In Stock" : "Out of Stock",
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateExistingProduct(id, payload));
    navigate("/products");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none";

  if (loading || !product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        Edit Employee Details
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Employee ID: <span className="font-mono">{id}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 space-y-10"
      >

        {/* BASIC INFO */}
        <section>
          <h3 className="text-lg font-semibold mb-6">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                name="name"
                value={product.name}
                className={inputClass}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Employee Last Name</label>
              <input
                name="lastname"
                value={product.lastname}
                className={inputClass}
                onChange={handleChange}
                required
              />

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sex</label>
              <select
                name="s_sex"
                value={product.s_sex}
                className={inputClass}
                onChange={handleChange}
                required
              >
                <option value="">Select Sex</option>
                {Sex.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">DOB</label>
              <select
                name="month"
                value={product.month}
                className={inputClass}
                onChange={handleChange}
                required
              >
                <option value="">Month</option>
                {Month.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select
                name="s_date"
                value={product.s_date}
                className={inputClass}
                onChange={handleChange}
                required
              >
                <option value="">Date</option>
                {c_Date.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select
                name="s_year"
                value={product.s_year}
                className={inputClass}
                onChange={handleChange}
                required
              >
                <option value="">Year</option>
                {Year.map((s) => (
                  <option key={s}>{s}</option>
                ))}

              </select>
            </div>

          </div>
        </section>

        {/* Communication details */}
        <section>
          <h3 className="text-lg font-semibold mb-6">
            Communication details
          </h3>
          <label className="block text-sm font-medium mb-1">Address (#)</label>
          <input
            name="address"
            value={product.address}
            className={inputClass}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1">Phone number (#)</label>
          <input
            name="phnumber"
            type="number"
            value={product.phnumber}
            className={inputClass}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1">Email Id</label>
          <input
            name="emailid"
            type="email"
            value={product.emailid}
            className={inputClass}
            onChange={handleChange}
            required
          />
        </section>

        {/* DESCRIPTION */}
        <section>
          <h3 className="text-lg font-semibold mb-6">
            Description & Highlights
          </h3>

          <textarea
            name="description"
            rows="4"
            value={product.description}
            className={inputClass}
            onChange={handleChange}
          />

          <div className="mt-4 space-y-3">

            <button
              type="button"
              onClick={addHighlight}
              className="text-blue-600 text-sm font-medium"
            >
              + Add Highlight
            </button>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-2.5 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}
