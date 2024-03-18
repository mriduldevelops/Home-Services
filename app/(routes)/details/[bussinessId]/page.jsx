"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BussinessInfo from "../_components/BussinessInfo";
import BussinessDescription from "../_components/BussinessDescription";
import SuggestedBussinessList from "../_components/SuggestedBussinessList";

function BussinessById({ params }) {
  const { status } = useSession();
  const [bussiness, setBussiness] = useState([]);

  useEffect(() => {
    params && getBussinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const getBussinessById = () => {
    GlobalApi.getBussinessById(params.bussinessId).then((res) =>
      setBussiness(res.bussinessList)
    );
  };
  const checkUserAuth = () => {
    if (status == "loading") {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }
    if (status == "unauthenticated") {
      signIn("descope");
    }
  };
  return (
    status == "authenticated" &&
    bussiness && (
      <div className="py-8 md:py-20 px-10 md:px-12 lg:px-36">
        <BussinessInfo bussiness={bussiness} />
        <div className='grid grid-cols-3 mt-16'>
          <div className='col-span-3 md:col-span-2 order-last md:order-first'>
          <BussinessDescription bussiness={bussiness}/>
          </div>
          <div>
          <SuggestedBussinessList bussiness={bussiness}/>
          </div>
        </div>
    
      </div>
    )
  );
}

export default BussinessById;
