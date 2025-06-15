"use client"

import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function LocationHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { id: "deal-overview", label: "Deal Overview", path: "/deals" },
    { id: "workshop", label: "Workshop", path: "/deals/workshop" },
    { id: "pipeline", label: "Pipeline", path: "/deals/pipeline" },
    { id: "location", label: "Location", path: "/deals/locationanalysis" },
    { id: "settings", label: "Settings", path: "/deals/settings" },
  ]

  return (
    <nav className="w-full">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mt-3 gap-4 sm:gap-0">
        {/*---- Menus ----*/}
        <ul className="w-full sm:w-[30%] flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-4 text-sm sm:text-base text-zinc-700">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`cursor-pointer transition-colors hover:text-black ${
                  isActive ? "text-black font-semibold text-lg" : ""
                }`}
              >
                {item.label}
              </li>
            )
          })}
        </ul>

        {/*---- Input Field + Avatar + Logo ----*/}
        <div className="flex flex-col sm:flex-row w-full sm:w-[55%] px-4 sm:px-0 items-center justify-between gap-4 sm:gap-2">
          {/* Avatar + Input */}
          <div className="flex items-center w-full sm:w-auto gap-2">
            <Avatar>
              <AvatarImage src="../Avatar.png" />
              <AvatarFallback>SB</AvatarFallback>
            </Avatar>
            <input
              className="flex-grow border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Ask me anything"
            />
          </div>

          {/* Logo */}
          <div className="sm:flex justify-center sm:justify-end w-full sm:w-auto hidden">
            <Image
              width={50}
              height={50}
              src="/24a55148-6c38-40de-a51e-9fcf59c0e5e8.png"
              alt="logo"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
