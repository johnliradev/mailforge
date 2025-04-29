import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  return (
    <nav className="w-full dark:bg-gray-900/80 backdrop-blur-sm dark:backdrop-blur-md border-b dark:border-gray-800 ">
      <div className=" mx-auto sm:px-10 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Mail className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-xl font-bold ">Mail Forge</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative pl-[2px] pr-[2px] pb-[2px] rounded-lg rainbow-border">
              <Button
                size="sm"
                className=" cursor-pointer hover:bg-white px-2 py-2 bg-white text-black rounded-md"
              >
                <Link
                  href="https://github.com/johnliradev"
                  className="flex items-center"
                >
                  <p className="text-[12px] font-medium">Feito por John Lira</p>
                  <ChevronRight />
                </Link>
              </Button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
