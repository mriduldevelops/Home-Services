import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function BussinessList({ title, BussinessList }) {
  return (
    <div>
      <h2 className="font-bold text-xl">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-6">
        {BussinessList.length > 0
          ? BussinessList.map((bussiness) => (
              <div
                key={bussiness.id}
                className="shadow-md rounded-md hover:shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all ease-in-out"
              >
                <Image
                  src={bussiness.images[0].url}
                  alt="bussines-img"
                  width={300}
                  height={200}
                  className="rounded-md"
                />
                <div className="p-3 flex flex-col gap-1 items-baseline">
                  <span className="bg-purple-100 py-1 px-4 rounded-full text-purple-600 text-xs">
                    {bussiness.category.name}
                  </span>
                  <h2 className="font-bold text-lg">{bussiness.name}</h2>
                  <h2 className="text-purple-600 font-semibold">
                    {bussiness.contactPerson}
                  </h2>
                  <p className="text-gray-500 text-sm">{bussiness.address}</p>
                  <Link href={"/details/" + bussiness.id}>
                    <Button className="mt-3 bg-purple-700 hover:bg-purple-800 cursor-pointer">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[300px] w-full bg-slate-200 animate-pulse
                rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BussinessList;
