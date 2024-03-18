"use client";
import { useEffect, useState } from "react";
import CategoryList from "./_components/CategoryList";
import Hero from "./_components/Hero";
import GlobalApi from "./_services/GlobalApi";
import BussinessList from "./_components/BussinessList";
function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [allBussinessList, setAllBussinessList] = useState([]);
  useEffect(() => {
    getCategoryList();
    getAllBussinessLists();
  }, []);

  // category list
  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => setCategoryList(res.categories));
  };

  // bussines list
  const getAllBussinessLists = () => {
    GlobalApi.getBussinessLists().then((res) => setAllBussinessList(res.bussinessLists
      ));
  };
  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BussinessList title={"Popular Bussinesses"} BussinessList={allBussinessList} />
    </div>
  );
}

export default Home;
