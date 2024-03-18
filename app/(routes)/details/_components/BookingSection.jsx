import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";

function BookingSection({ children, bussiness }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  //  Get Selected Date Business Booked Slot

  useEffect(() => {
    date && BussinessBookedSlot();
  }, [date]);
  const BussinessBookedSlot = () => {
    GlobalApi.BussinessBookedSlot(bussiness.id, moment(date).format('DD-MMM-yyyy')).then((res) => {
      setBookedSlot(res.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createBoooking(
      bussiness.id,
      moment(date).format('DD-MMM-yyyy'),
      selectedTime,
      data.user.email,
      data.user.name
    ).then((res) => {
      // console.log(res);
      if (res) {
        setDate();
        setSelectedTime("");
        toast("Service Booked successfully!");
      }
      (e) => {
        toast("Error while creating booking");
      };
    });
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time == time);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book an service
            </SheetDescription>
            {/* Date Picker  */}

            <div className="flex flex-col gap-5 items-baseline">
              <h2 className="mt-5 font-bold">Select Date</h2>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md mx-auto"
              />
            </div>

            {/* Time Slot Picker  */}
            <h2 className="my-5 font-bold">Select Time Slot</h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlot.map((item, index) => (
                <Button
                  key={index}
                  disabled={isSlotBooked(item.time)}
                  variant="outiline"
                  className={`border rounded-full 
                p-2 px-3 hover:bg-primary
                 hover:text-white
                 ${selectedTime == item.time && "bg-primary text-white"}`}
                  onClick={() => setSelectedTime(item.time)}
                >
                  {item.time}
                </Button>
              ))}
            </div>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                  className="bg-purple-700"
                >
                  Book
                </Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
