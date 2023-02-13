import { useEffect, useState } from "react";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import Link from "next/link";
export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex space-x-4 items-center text-sm font-light">
        <SearchOutlined className="hidden  sm:inline" />
        <p className="hidden lg:inline">Kids</p>

        <BellFilled className=" inline-block" />
        <Link href={"/account"}>
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}
