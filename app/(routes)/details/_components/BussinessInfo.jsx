import { Button } from "@/components/ui/button";
import { Mail, MapPin, Share, User, Clock } from "lucide-react";
import Image from "next/image";
function BussinessInfo({ bussiness }) {
  return (
    bussiness?.name && (
      <div className="md:flex gap-4 items-center">
        <Image
          src={bussiness?.images[0]?.url}
          alt={bussiness.name}
          width={150}
          height={200}
          className="rounded-full h-[150px]
        object-cover"
        />
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col mt-4 md:mt-0 items-baseline gap-3">
            <h2
              className="text-primary p-1 px-3
        text-lg 
        bg-purple-100 rounded-full"
            >
              {bussiness?.category?.name}
            </h2>
            <h2 className="text-[40px] font-bold">{bussiness.name}</h2>
            <h2 className="flex gap-2 text-lg text-gray-500">
              <MapPin /> {bussiness.address}
            </h2>
            <h2 className="flex gap-2 text-lg text-gray-500">
              <Mail />
              {bussiness?.email}
            </h2>
          </div>
          <div className="flex flex-col gap-5 items-end">
            <Button className="bg-purple-700 hover:bg-purple-800 ">
              <Share />
            </Button>
            <h2 className="flex gap-2 text-xl text-primary">
              <User /> {bussiness.contactPerson}
            </h2>
            <h2 className="flex gap-2 text-xl text-gray-500">
              <Clock /> Available 8:00 AM to 10:PM
            </h2>
          </div>
        </div>
      </div>
    )
  );
}

export default BussinessInfo;
