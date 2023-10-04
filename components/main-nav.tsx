"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const [mobileNav, setMobileNav] = useState(false);

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },

    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/brands`,
      label: "Brands",
      active: pathname === `/${params.storeId}/brands`,
    },
    {
      href: `/${params.storeId}/types`,
      label: "Types",
      active: pathname === `/${params.storeId}/types`,
    },
    {
      href: `/${params.storeId}/locations`,
      label: "Locations",
      active: pathname === `/${params.storeId}/locations`,
    },
    {
      href: `/${params.storeId}/rates`,
      label: "Rates",
      active: pathname === `/${params.storeId}/rates`,
    },
    {
      href: `/${params.storeId}/powers`,
      label: "Power",
      active: pathname === `/${params.storeId}/powers`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
  ];

  return (
    <>
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary max-xl:hidden ",
              route.active
                ? "text-black dark:text-white "
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}

        {mobileNav === false ? (
          <BsFilterRight
            onClick={() => setMobileNav(!mobileNav)}
            className="text-3xl xl:hidden cursor-pointer"
          />
        ) : (
          <AiOutlineClose
            onClick={() => setMobileNav(!mobileNav)}
            className="text-2xl xl:hidden cursor-pointer"
          />
        )}
      </nav>
      {mobileNav && (
        <div
          onClick={() => setMobileNav(false)}
          className="absolute top-16 left-0 w-full h-screen bg-opacity-50  bg-gray-100 transition-all"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-0 left-0 w-[30%] max-lg:w-[100%] h-full bg-white z-10 shadow-md transition-all  flex flex-col text-center gap-8 p-10 pt-28 max-sm:pt-16"
          >
            {routes.map((route) => (
              <Link
                onClick={() => setMobileNav(false)}
                key={route.href}
                href={route.href}
                className={cn(
                  "text-[1.1rem] font-semibold  transition-colors hover:text-primary ",
                  route.active
                    ? "text-black dark:text-white "
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MainNav;
