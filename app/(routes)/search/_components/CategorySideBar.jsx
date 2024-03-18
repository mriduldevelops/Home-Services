"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const params = usePathname();
  params.split("/")[2];

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  useEffect(() => {
    getCategoryList();
  }, []);

  // category list
  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => setCategoryList(res.categories));
  };

  return (
    <div className="hidden md:block">
      <h2 className="mb-3 font-bold text-lg text-purple-600">Categories</h2>
      <div>
        {categoryList.map((category) => (
          <Link
            href={"/search/" + category.name}
            key={category.id}
            className={`flex items-center gap-2 p-3 mb-3 border rounded-lg mr-10 shadow-md cursor-pointer ${
              selectedCategory == category.name &&
              "border-purple-600 text-purple-600 shadow-md bg-purple-50 scale-105"
            }`}
          >
            <Image
              src={category.icon.url}
              alt="icon"
              height={30}
              width={30}
              className="w-auto h-auto"
            />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
