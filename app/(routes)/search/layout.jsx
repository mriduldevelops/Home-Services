import React from "react";
import CategorySideBar from "./_components/CategorySideBar";

function layout({ children }) {
  return (
    <div className="pt-5 grid grid-cols-4">
      <div>
        <CategorySideBar/>
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}

export default layout;
