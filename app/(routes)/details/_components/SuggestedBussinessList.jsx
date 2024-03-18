import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookingSection from "./BookingSection";

function SuggestedBussinessList({ bussiness }) {
  const [bussinessList, setBusinessList] = useState([]);

  useEffect(() => {
    bussiness && getBussinessList();
  }, [bussiness]);

  const getBussinessList = () => {
    GlobalApi.getBussinessByCategory(bussiness?.category?.name).then((res) =>
      setBusinessList(res?.bussinessLists)
    );
  };

  return (
    <div className="md:pl-10">
      <BookingSection bussiness = {bussiness}>
        <Button className="flex gap-2 lg:w-full w-32 bg-purple-700 hover:bg-purple-800 ">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2
          className="font-bold 
      text-lg mt-3 mb-3
      
      "
        >
          Similar Bussiness
        </h2>
        <div className="">
          {bussinessList &&
            bussinessList.map((bussiness, index) => (
              <Link
                href={"/details/" + bussiness.id}
                className="flex gap-4 mb-4 items-center flex-col lg:flex-row
          hover:border rounded-lg p-2
          cursor-pointer hover:shadow-md
           border-primary"
                key={index}
              >
                <Image
                  src={bussiness?.images[0].url}
                  alt={bussiness.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover h-[80px]"
                />
                <div className="">
                  <h2 className="font-bold">{bussiness.name}</h2>
                  <h2 className="text-primary">{bussiness.contactPerson}</h2>
                  <h2 className="text-gray-400">{bussiness.address}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBussinessList;
