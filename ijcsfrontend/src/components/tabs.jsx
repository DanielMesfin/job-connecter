import React, { useState } from "react";
import { Progress } from "@material-tailwind/react";

const ProgressBar = ({ percentage }) => (
  <div className="flex">
    <div className="w-[10rem]">
      <Progress value={percentage} color="blue" />;
    </div>
    <div className="w-10 h-10">
      <p className="text-xs font-semibold">{percentage.toFixed(2)}%</p>
    </div>
  </div>
);

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  const getNextTab = () => {
    const currentIndex = children.findIndex(
      (child) => child.props.label === activeTab
    );
    const nextIndex = (currentIndex + 1) % children.length;
    setActiveTab(children[nextIndex].props.label);
  };

  const getPreviousTab = () => {
    const currentIndex = children.findIndex(
      (child) => child.props.label === activeTab
    );
    const previousIndex =
      (currentIndex - 1 + children.length) % children.length;
    setActiveTab(children[previousIndex].props.label);
  };

  const completionPercentage =
    ((children.findIndex((child) => child.props.label === activeTab) + 1) /
      children.length) *
    100;

  return (
    <div className=" flex flex-col m-auto justify-center">
      <div className="flex  px-80  md:px-52 lg:px-0  justify-end">
        <ProgressBar percentage={completionPercentage} />
      </div>
      {/* <div className="flex border-b border-gray-300 justify-evenly"> */}
      {/* for md and < screen sizes */}
      <div className="md:grid grid-cols-1 justify-center text-center  md:grid-cols-6 border-b border-gray-300 hidden md:visible">
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            } flex-1 text-gray-700 font-medium py-2 transition-all duration-500 `}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      {/* for xtra small screen size */}
      <div className="flex w-44 justify-center text-center border-b border-gray-300 visible md:hidden   ">
        <button
          className={`${
            activeTab ? "border-b-2 border-blue-500 text-blue-500" : ""
          } flex-1 text-gray-700 font-medium py-2  w-10 `}
        >
          {activeTab}
        </button>
      </div>

      <div className="py-4 mt-10">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return (
              <div
                key={child.props.label}
                className="mr-44 md:ml-2  lg:ml-2 lg:mr-0"
              >
                {child.props.children}
                <div className="w-56 space-x-4 grid grid-cols-2 mt-4">
                  {completionPercentage != 20 && (
                    <button
                      onClick={getPreviousTab}
                      className="bg-gray-300 px-4 py-2 text-gray-700"
                    >
                      Previous
                    </button>
                  )}

                  {completionPercentage != 100 && (
                    <button
                      onClick={getNextTab}
                      className="bg-blue-500 px-4 py-2 text-white"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden ">
      {children}
    </div>
  );
};

export { Tabs, Tab, ProgressBar };
