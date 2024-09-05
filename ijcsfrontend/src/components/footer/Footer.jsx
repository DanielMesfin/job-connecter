import React from "react";
import { PiBriefcaseLight } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-black text-white">
        <div className="py-20 px-1 md:px-28">
          <div className="grid grid-cols-4 space-y-5  md:grid-cols-5 md:space-x-5">
            <div className="col-span-4 md:col-auto space-y-5 ">
              <Link to={"/"} className="flex gap-1 items-center">
                <PiBriefcaseLight className="w-10 h-7 text-white" />
                <p className="font-bold">IJC</p>
              </Link>
              <a
                href="tel:0965-847366"
                className="text-gray-500 text-sm cursor-pointer hover:underline hover:underline-offset-2"
              >
                Call now{" "}
                <strong className="text-white">(+251)-965-847366</strong>{" "}
              </a>
              <p className="text-gray-500 text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing
                elit.consectetur adipisicing elit
              </p>
            </div>
            <div>
              <h2>Quick Link</h2>
              <ul className="mt-3 space-y-4 text-gray-500 text-sm">
                <Link to={"/about_ijcs"}>
                  <li className="cursor-pointer">About</li>
                </Link>
                <Link to={"/contact_us"}>
                  <li className="cursor-pointer">Contact</li>
                </Link>
                <li className="cursor-pointer">Make CV</li>
              </ul>
            </div>
            <div>
              <h2>Job Seeker</h2>
              <ul className="mt-3 space-y-4 text-gray-500 text-sm">
                <li className="cursor-pointer">Browse Job</li>
                <li className="cursor-pointer">Job Seeker Dashboard</li>
                <li className="cursor-pointer">Saved Job</li>
              </ul>
            </div>
            <div>
              <h2>Employers</h2>
              <ul className="mt-3 space-y-4 text-gray-500 text-sm">
                <li className="cursor-pointer">Post Job</li>
                <li className="cursor-pointer">Employer Dashboard</li>
              </ul>
            </div>
            <div>
              <h2>Support</h2>
              <ul className="mt-3 space-y-4 text-gray-500 text-sm">
                <li className="cursor-pointer">FAQs</li>
                <li className="cursor-pointer">Privacy Policy</li>
                <li className="cursor-pointer">Terms and Conditions</li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex px-3 md:px-28 justify-between py-5">
          <div>
            <p className=" text-gray-500 text-sm">
              &#169; 2024 <strong>IJC</strong> All rights Reserved.
            </p>
          </div>
          <div className="flex gap-5">
            <Link>
              <FaFacebookF />
            </Link>
            <Link>
              <FaYoutube />
            </Link>
            <Link>
              <FaInstagram />
            </Link>
            <Link>
              <BsTwitterX />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
