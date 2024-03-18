import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

function Hero() {
  return (
    <div className='flex flex-col justify-center items-center pt-7 pb-4 gap-3'>
        <h2 className='text-center font-bold text-[46px]'>Find Home <span className='text-purple-600'>Service/Repair</span> <br />Near You</h2>
        <h2 className='text-gray-400 font-semibold text-center'>Explore Best Home Service & Repair near you</h2>
        <div className="mt-5 flex items-center gap-2">
            <Input placeholder="Search" className="rounded-full w-[50vw] md:w-[30vw]"/>
            <Button className="bg-purple-700 hover:bg-purple-800 rounded-full h-[45px]"><Search className="h-4 w-4"/></Button>
        </div>
    </div>
  )
}

export default Hero