"use client";
import BussinessList from "@/app/_components/BussinessList";
import GlobalApi from "@/app/_services/GlobalApi";
import React, { useEffect, useState } from "react";

function BussinessByCateogry({ params }) {
    const [bussinessLists, setBussinessLists] = useState([]);
  useEffect(() => {
    // console.log(params);
    params && getBussinessList();
  }, [params]);

  const getBussinessList = () => {
    GlobalApi.getBussinessByCategory(params.category).then((res) =>
    setBussinessLists(res?.bussinessLists)
    );
  };
  // console.log(params.category)
  return <div>
    <BussinessList title={params.category} BussinessList={bussinessLists}/>
  </div>;
}

export default BussinessByCateogry;
