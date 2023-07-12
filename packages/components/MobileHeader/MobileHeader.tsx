import React from "react";
import { Link } from "react-router-dom";
import * as Avatar from "@radix-ui/react-avatar";

const MobileHeader = () => {
  return (
    <>
      <div className="border p-5 w-full bg-white rounded-lg block md:hidden">
        <div className="grid !mb-2">
          <ul>
            <li className="!my-3">
              <Link
                to=""
                style={{ color: "#000593", textDecoration: "none" }}
                className="whitespace-no-wrap text-base hover:no-underline leading-6 no-underline font-medium text-[#000593] hover:text-[#3f5ead]"
              >
                🔥 Refer a friend
              </Link>
            </li>

            <li className="!mt-3">
              <Link
                to=""
                style={{ color: "#000593", textDecoration: "none" }}
                className="whitespace-no-wrap w-fit inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md !text-white bg-[#002993] hover:bg-[#2655cd] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-[#2655cd] transition ease-in-out duration-150"
              >
                Deposit and Withdraw
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown-item w-full">
          <div className="flex py-3 gap-3 items-center ">
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Fallback className="text-white bg-primary-500 leading-1 flex h-full w-full items-center justify-center text-[15px] font-semibold">
                  RK
                </Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="">
              <h5 className="mb-0 text-xl font-semibold">Rohit Kashyap</h5>
              <p className="mb-0 text-base font-normal">
                Rohitkashyap7376@gmail.com
              </p>
            </div>
          </div>

          <div className=" py-2">
            <h2
              className="font-semibold
               text-black text-base tracking-wide"
            >
              Account Settings
            </h2>
          </div>

          <div className=" py-2">
            <h2 className="font-semibold text-[red] text-base tracking-wide">
              Logout
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
