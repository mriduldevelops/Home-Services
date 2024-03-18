import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div className="my-8 mx-4 md:mx-22 lg:mx-52 grid grid-cols-3 lg:grid-cols-6 gap-4">
      {categoryList.length > 0
        ? categoryList.map((category) => (
            <Link href={'/search/'+category.name}
              key={category.id}
              className={`flex flex-col items-center bg-purple-50
        justify-center gap-2 p-5 rounded-lg
        cursor-pointer hover:scale-110 transition-all ease-in-out
        `}
            >
              <Image
                src={category.icon.url}
                alt="icon"
                width={35}
                height={35}
              />
              <h2 className="font-semibold">{category.name}</h2>
            </Link>
          ))
        : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[120px]
        w-full bg-slate-200 animate-pulse
        rounded-lg"
            ></div>
          ))}
    </div>
  );
}

export default CategoryList;
