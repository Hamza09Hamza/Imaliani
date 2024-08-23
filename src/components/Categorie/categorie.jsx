"use client";
import React, { useEffect, useState } from "react";
import Head from "../header";
import ProductList from "./ProductList";
import { OriginCategorieList } from "../products";
import CatList from "./CatList";
import {
  fetchrandomProducts,
  fetchCatProducts,
} from "@/Firebase/CRUD/Products";
import Loading from "../loading";

const Categorie = () => {
  const [cat, setCat] = useState("All");
  const [listcat, setListCat] = useState("");
  const [CategorieList, setCategorieList] = useState(OriginCategorieList);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [lastVisibleOrder, setLastVisibleOrder] = useState(null);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleCategorie = (value) => {
    if (value !== "All") {
      const filteredList = OriginCategorieList.filter((item) =>
        value.includes(item)
      );
      setCategorieList(
        filteredList.length > 0 ? filteredList : OriginCategorieList
      );
      setCat(value);
      setLastVisibleOrder(null);
      setListCat(filteredList[0]);
    } else {
      setCategorieList(OriginCategorieList);
      setCat(value);
      setLastVisibleOrder(null);
      setListCat("");
    }
  };

  const fetchProducts = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      let fetchedProducts;
      let lastVisible;

      if (listcat) {
        const result = await fetchCatProducts(listcat, lastVisibleOrder, 10);
        fetchedProducts = result.products;
        lastVisible = result.lastVisible;
      } else {
        const result = await fetchrandomProducts(lastVisibleOrder, 10);
        fetchedProducts = result.products;
        lastVisible = result.lastVisible;
      }

      setProducts((prevProducts) =>
        isLoadMore ? [...prevProducts, ...fetchedProducts] : fetchedProducts
      );
      setLastVisibleOrder(lastVisible);
      setHasMoreProducts(fetchedProducts.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [listcat]);

  const loadMoreProducts = () => {
    fetchProducts(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="w-screen h-screen relative max-h-screen overflow-hidden pb-20 xxs:pb-90 bg-gray-50">
        <Head status={true} categorie={cat} setCategorie={handleCategorie} />
        <div className="flex flex-row h-full overflow-hidden bg-gray-50">
          <div
            className={`lg:w-1/5 text-gray-700 bg-gray-50 flex flex-col justify-around mid:w-[fit] h-fit mid:pb-40 pb-40 xxs:pb-2 transition-transform transform duration-500`}
            style={{ zIndex: 200 }}
          >
            <CatList
              list={CategorieList}
              setList={setListCat}
              listcat={listcat}
              toggleSidebar={toggleSidebar}
              status={isSidebarOpen}
            />
          </div>
          <div className="flex-1 lg:pl-2   overflow-y-scroll pb-60 xxs  h-full mid:pb-10 xxs:pb-4 bg-gray-50">
            {loading ? (
              <Loading />
            ) : (
              <ProductList products={products ? products : []} />
            )}

            {hasMoreProducts && loadingMore == false ? (
              <div className="flex justify-center lg:mt-20 mb-60 xxs:mt-2 my-4">
                <button
                  onClick={loadMoreProducts}
                  className="bg-hardBeige text-white px-4 py-2 rounded-3xl hover:bg-tooHardBeige duration-700 transition-all"
                  disabled={loadingMore} // Disable the button when loading more
                >
                  Load More
                </button>
              </div>
            ) : loadingMore == true ? (
              <>
                {" "}
                <div className="flex space-x-2 justify-center mt-20 items-center animate-pulse">
                  <div className="w-3 h-3 bg-hardBeige rounded-full"></div>
                  <div className="w-3 h-3 bg-hardBeige rounded-full"></div>
                  <div className="w-3 h-3 bg-hardBeige rounded-full"></div>
                </div>
              </>
            ) : (
              <>
                <h4> we don't have another similair piece</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categorie;
