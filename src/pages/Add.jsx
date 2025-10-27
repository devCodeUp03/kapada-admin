import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Men");
  const [productSubCategory, setProductSubCategory] = useState("Topwear");
  const [productPrice, setProductPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleProductSubCategoryChange = (e) => {
    setProductSubCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("category", productCategory);
      formData.append("subCategory", productSubCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", isBestSeller);
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { "Content-Type": "multipart/form-data", token: token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setProductName("");
        setProductDescription("");
        setProductCategory("Men");
        setProductSubCategory("Topwear");
        setProductPrice("");
        setSizes([]);
        setIsBestSeller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1" className="cursor-pointer ">
            {image1 ? (
              <img
                className="w-20 object-cover h-20"
                src={URL.createObjectURL(image1)}
              />
            ) : (
              <img className="w-20" src={assets.upload_area} alt="" />
            )}
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2" className="cursor-pointer ">
            <img
              className="w-20 h-20 object-cover"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3" className="cursor-pointer ">
            <img
              className="w-20 object-cover h-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4" className="cursor-pointer ">
            <img
              className="w-20 h-20 object-cover"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write description"
          required
          rows={4}
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            value={productCategory}
            onChange={handleProductCategoryChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product subcategory</p>
          <select
            className="w-full px-3 py-2"
            value={productSubCategory}
            onChange={handleProductSubCategoryChange}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div>
            <p
              className={`${
                sizes.includes("S") ? "bg-slate-500 text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer  `}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((size) => size !== "S")
                    : [...prev, "S"]
                )
              }
            >
              S
            </p>
          </div>
          <div>
            <p
              className={`${
                sizes.includes("M") ? "bg-slate-500 text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer  `}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((size) => size !== "M")
                    : [...prev, "M"]
                )
              }
            >
              M
            </p>
          </div>
          <div>
            <p
              className={`${
                sizes.includes("L") ? "bg-slate-500 text-white" : "bg-slate-200"
              } px-3 py-1 cursor-pointer  `}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((size) => size !== "L")
                    : [...prev, "L"]
                )
              }
            >
              {" "}
              L
            </p>
          </div>
          <div>
            <p
              className={`${
                sizes.includes("XL")
                  ? "bg-slate-500 text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer  `}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((size) => size !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              {" "}
              XL
            </p>
          </div>
          <div>
            <p
              className={`${
                sizes.includes("XXL")
                  ? "bg-slate-500 text-white"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer  `}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((size) => size !== "XXL")
                    : [...prev, "XXL"]
                )
              }
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={isBestSeller}
          onChange={() => setIsBestSeller(!isBestSeller)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
