import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function LocationHeader() {

    
  return (
    <nav className="">
      <div className="flex flex-1 flex-wrap justify-between items-center mt-3">
        {/*----Menus--- */}
        <ul className=" w-[30%] hidden sm:flex justify-between items-center gap-6 text-base">
          <li>Deal Overview</li>
          <li>Workshop</li>
          <li>Pipeline</li>
          <li className="font-medium">Location</li>
          <li>Settings</li>
        </ul>
        
    
        {/*------Input Field---- */}
        <div className=" flex w-full px-10 py-1 sm:p-1 sm:w-[55%] text-center sm:justify-between items-center ">
        <div className="flex items-center gap-2">
          <Avatar className="">
            <AvatarImage src="../Avatar.png" />
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
          <input
            className=" border w-62 py-1 rounded text-center"
            type="text"
            placeholder="Ask me anything"
          />
        </div>
        

        <div className="mr-4 hidden sm:inline">
            <Image width={50} height={50} src='/24a55148-6c38-40de-a51e-9fcf59c0e5e8.png' alt="logo"/>
        </div>
        </div>

      </div>
    </nav>
  );
}
