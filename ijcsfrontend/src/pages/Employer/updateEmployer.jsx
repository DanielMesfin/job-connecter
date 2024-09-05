import React, { useCallback, useEffect, useState } from "react";
// import { Tabs, Tab } from "../../components/tabs";

import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useUserContext } from "../../context/context";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Stepper,
  Step,
  Typography,
} from "@material-tailwind/react";

import { FaRegCircleUser } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { SlGlobe } from "react-icons/sl";
import { TbSettingsCog } from "react-icons/tb";

function UpdateEmployer() {
  const OrganizationTypes = [
    "Private Organization",
    "Governmental Organization",
    "Non-Profit Organization",
    "Public private partner ship",
  ];
  const industries = [
    "Aerospace Industry",
    "Agricultural Industry",
    "Automotive Industry",
    "Chemical Industry",
    "Computer Industry",
    "Construction Industry",
    "Education Industry",
    "Energy Industry",
    "Entertainment Industry",
    "Financial Services Industry",
    "Health Services Industry",
    "Information Industry",
    "Manufacturing Industry",
    "Mining Industry",
    "Pharmaceutical Industry",
    "Real Estate Industry",
    "Retail Industry",
    "Telecommunications Industry",
    "Transport Industry",
  ];
  const socialMediaPlatforms = [
    "Facebook",
    "LinkedIn",
    "TikTok",
    "Telegram",
    "Twitter",
    "Instagram",
    "YouTube",
    "Pinterest",
    "Snapchat",
  ];

  const { user, CheckProfile } = useUserContext();
  const navigate = useNavigate();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [password, setPassord] = useState();
  const [confirmPassword, setConfirmPassord] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [company_names, setCompanyName] = useState(
    user.full_name ? user.full_name : ""
  );
  const [about_us, setAboutUs] = useState(user.about ? user.about : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [organizationType, setOrganizationType] = useState(
    user.organizationType ? user.organizationType : ""
  );
  const [industryType, setIndustryType] = useState(
    user.industryType ? user.industryType : ""
  );
  const [teamSize, setTeamSize] = useState(
    user.numberOfEmployees ? user.numberOfEmployees : ""
  );
  const [yearOfStablishment, setYearOfStablishment] = useState(
    user.yearOfStablishment ? user.yearOfStablishment : ""
  );
  const [companyWebsite, setCompanyWebsite] = useState(
    user.portifolio ? user.portifolio : ""
  );
  const [companyVision, setCompanyVision] = useState(
    user.vision ? user.vision : ""
  );
  //need to be array

  const [phone, setPhone] = useState(user.phone ? user.phone : "");
  const [email, setEmail] = useState(user.email ? user.email : "");

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [links, setLinks] = useState(
    user.socialMediaLink != null
      ? user.socialMediaLink
      : [{ name: "", url: "" }]
  );
  console.log(user.socialMediaLink);
  const [countAboutUs, setCountAboutUs] = useState(1000);
  const [countVision, setCountVision] = useState(500);

  const addLink = (e) => {
    e.preventDefault();
    setLinks([...links, { name: "", url: "" }]);
  };

  const updateLink = (index, updatedLink) => {
    setLinks(links.map((link, i) => (i === index ? updatedLink : link)));
  };

  const removeLink = (e, index) => {
    e.preventDefault();
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedLogo(URL.createObjectURL(file));
  };
  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    setSelectedBanner(URL.createObjectURL(file));
  };

  const onDropLogo = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedLogo(URL.createObjectURL(file));
    console.log("selected logo is : ", selectedLogo);
    setLogo(file);
  }, []);

  const onDropBanner = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedBanner(URL.createObjectURL(file));
    setBanner(file);
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps: getRootPropsLogo,
    getInputProps: getInputPropsLogo,
    isDragActive: isLogoDragActive,
  } = useDropzone({ onDrop: onDropLogo });
  const {
    getRootProps: getRootPropsBanner,
    getInputProps: getInputPropsBanner,
    isDragActive: isBannerDragActive,
  } = useDropzone({ onDrop: onDropBanner });

  const Update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("banner", banner);
    formData.append("full_name", company_names);
    formData.append("username", company_names);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("socialMediaLink", JSON.stringify(links));
    formData.append("phone", phone);
    formData.append("about", about_us);
    formData.append("vision", companyVision);
    formData.append("organizationType", organizationType);
    formData.append("industryType", industryType);
    formData.append("numberOfEmployees", teamSize);
    formData.append("yearOfStablishment", yearOfStablishment);
    formData.append("portifolio", companyWebsite);
    formData.append("password", password);
    formData.append("is_employer", true);

    await axios
      .patch(
        `http://127.0.0.1:8000/user/employer/update/${user.id}/`,
        formData,
        {
          headers: {
            "X-CSRFToken": "here is the crf code",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((value) => {
        console.log(value.data);
        setErrorMessage("");
        setMessage("Profile Update Successfull");
        CheckProfile();

        // navigate("/succeedRegisterEmployer");
      })
      .catch((err) => {
        console.log(err);
        setMessage("");
        setErrorMessage("Profile Updating Failed ! Please Try Again");
      });

    console.log(
      logo,
      banner,
      company_names,
      email,
      location,
      links,
      phone,
      about_us,
      companyVision,
      organizationType,
      industryType,
      teamSize,
      yearOfStablishment,
      companyWebsite
    );
    // }
    // else {
    //   setErrorMessage("Password does not match !");
    // }
  };

  const DeleteAccount = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://127.0.0.1:8000/user/employer/delete/${user.id}/`)
      .then((value) => {
        console.log(value.data);
        setErrorMessage("");
        setMessage("Profile Deleted Successfull");
        localStorage.removeItem("authedUserData");

        navigate("/register");
      })
      .catch((err) => {
        console.log(err);
        setMessage("");
        setErrorMessage("Failed to Delete Account ! Please Try Again");
      });
  };

  return (
    <div className="font-serif">
      {errorMessage && (
        <div
          class="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Danger alert!</span>
          {errorMessage}
        </div>
      )}
      {message && (
        <div
          class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span class="font-medium">Success alert!</span> {message}
        </div>
      )}
      <form onSubmit={(e) => Update(e)} className="">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <LuUser2 className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue" : "gray"}
              >
                Company Info
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <FaRegCircleUser className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 1 ? "blue-gray" : "gray"}
              >
                Founding Info
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <SlGlobe className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 2 ? "blue-gray" : "gray"}
              >
                Social Media Profile
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(3)}>
            <SlGlobe className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 3 ? "blue-gray" : "gray"}
              >
                Contacts
              </Typography>
              <Typography
                color={activeStep === 3 ? "blue-gray" : "gray"}
                className="font-normal"
              ></Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(4)}>
            <TbSettingsCog className="h-5 w-5" />
            <div className="absolute -bottom-[2rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 4 ? "blue-gray" : "gray"}
              >
                Account Setting
              </Typography>
            </div>
          </Step>
        </Stepper>
        <div className="mt-16">
          {activeStep == 0 && (
            <div className="flex flex-col gap-2">
              <h2>Logo and Banner Image</h2>

              <div className="lg:grid grid-flow-row-dense grid-cols-3    gap-5">
                {/* for uploading logo */}
                <div className="flex flex-col gap-2">
                  <h2>Upload Logo</h2>
                  <div
                    className={`flex flex-col gap-2 border border-black justify-center lg:w-full border-dashed  bg-zinc-100 h-56 py-1`}
                  >
                    <div
                      {...getRootPropsLogo()}
                      className=" flex flex-col justify-center items-center p-5 w-full h-full"
                    >
                      <input
                        {...getInputPropsLogo()}
                        onChange={handleLogoUpload}
                      />
                      {isLogoDragActive ? (
                        <p
                          className={`absolute  px-24 py-16  bg-slate-300 text-black`}
                        >
                          Drop the Your Logo here
                        </p>
                      ) : (
                        <div className=" flex flex-col ">
                          {user.logo ? (
                            <div className="relative h-52">
                              <img
                                src={`http://localhost:8000${user.logo}`}
                                alt=""
                                className="h-52 w-full rounded-lg object-cover object-center"
                              />
                            </div>
                          ) : selectedLogo ? (
                            <div className="relative h-52">
                              <img
                                src={selectedLogo}
                                alt=""
                                className="h-52 w-full rounded-lg object-cover object-center"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center py-10">
                              {" "}
                              <FiUploadCloud width={100} height={100} />
                              <p>
                                <strong>Browse Photo</strong> or drop here
                              </p>
                              <p>max photo size is 5mb</p>{" "}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* for uploading banner */}
                <div className="flex flex-col col-span-2 gap-2 ">
                  <h2>Upload Banner</h2>
                  <div
                    className={`flex flex-col gap-2 border border-black border-dashed h-56 py-1 bg-zinc-100`}
                  >
                    <div
                      {...getRootPropsBanner()}
                      className=" flex flex-col  justify-center items-center px-5"
                    >
                      <input
                        {...getInputPropsBanner()}
                        onChange={handleBannerUpload}
                      />
                      {isBannerDragActive ? (
                        <p className="absolute px-64 py-16 bg-slate-300 text-black">
                          Drop the Your Banner here
                        </p>
                      ) : (
                        <div className=" flex flex-col justify-center items-center">
                          {selectedBanner ? (
                            <div className="relative h-52">
                              <img
                                src={selectedBanner}
                                alt=""
                                className="h-52 w-[80rem] rounded-lg object-cover object-center"
                              />
                            </div>
                          ) : user.banner ? (
                            <div className="relative h-52">
                              <img
                                src={`http://localhost:8000${user.banner}`}
                                alt=""
                                className="h-52 w-[80rem] rounded-lg object-cover object-center"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <FiUploadCloud width={100} height={100} />
                              <p>
                                <strong>Browse Photo</strong> or drop here
                              </p>
                              <p>max photo size is 5mb</p>{" "}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="space-y-2">
                <h2>Company Name</h2>
                <Input
                  size="lg"
                  label="Company Name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  type="text"
                  name="company_name"
                  id="company_name"
                  className="border outline-none p-3 w-80 md:w-full h-10  bg-zinc-100"
                  value={company_names}
                  placeholder="Enter Your Company Name "
                />
              </div>
              <div className="space-y-2 w-80 md:w-full">
                <h2>About Us</h2>
                {/* <textarea
              onChange={(e) => {
                setAboutUs(e.target.value);
                setCountAboutUs(1000 - e.target.value.length);
              }}
              name="about_us"
              id="about_us"
              cols="30"
              rows="10"
              className="border outline-none p-3 w-96 md:w-full  bg-zinc-100"
              value={about_us}
              maxLength={1000}
              placeholder={`Write About ${
                company_names ? company_names : "Your Company"
              }`}
            ></textarea> */}
                <div class="relative w-full min-w-[200px]">
                  <textarea
                    onChange={(e) => {
                      setAboutUs(e.target.value);
                      setCountAboutUs(1000 - e.target.value.length);
                    }}
                    name="about_us"
                    id="about_us"
                    cols="30"
                    rows="10"
                    class="peer h-full min-h-[100px] w-full resize-none rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    value={about_us}
                    maxLength={1000}
                    placeholder={`Write About ${
                      company_names ? company_names : "Your Company"
                    }`}
                  ></textarea>
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    {`Write About ${
                      company_names ? company_names : "Your Company"
                    }`}
                  </label>
                </div>
                <p
                  className={`${
                    countAboutUs == 0 ? "text-red-500" : "text-black"
                  } flex justify-end`}
                >
                  {countAboutUs > 0
                    ? countAboutUs
                    : "Not more than 3000 characters"}
                </p>
              </div>
            </div>
          )}
          {activeStep == 1 && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-7">
                <div className="w-full space-y-2">
                  <h2>Organization Type</h2>
                  <select
                    name="OrganizationType"
                    id="OrganizationType"
                    className="border py-2 px-5 w-80 md:w-full rounded-md"
                    onChange={(e) => setOrganizationType(e.target.value)}
                  >
                    {OrganizationTypes.map((value, index) => {
                      return (
                        <option
                          key={index}
                          value={value}
                          selected={value == organizationType ? true : false}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full space-y-2">
                  <h2>Industry Type</h2>
                  <select
                    name="Industry_Type"
                    id="Industry_Type"
                    className="border py-2 px-5 w-80 md:w-full rounded-md"
                    onChange={(e) => setIndustryType(e.target.value)}
                  >
                    {industries.map((value, index) => {
                      return (
                        <option
                          key={index}
                          value={value}
                          selected={value == industryType ? true : false}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full space-y-2">
                  <h2>Team Size</h2>

                  <Input
                    size="lg"
                    label="Team Size"
                    onChange={(e) => setTeamSize(e.target.value)}
                    type="number"
                    name="teamSize"
                    id="teamSize"
                    className="border outline-none p-3 w-80 md:w-full h-10 capitalize "
                    placeholder={`Number of Employees in ${
                      company_names ? company_names : "Your Comapany"
                    }`}
                    Year
                    of
                    Establis
                    value={teamSize}
                  />
                </div>
                <div className="space-y-2">
                  <h2>Year of Establishment</h2>
                  <Input
                    size="lg"
                    label="Year of Establishment"
                    onChange={(e) => setYearOfStablishment(e.target.value)}
                    type="date"
                    name="stablishment year"
                    id="stablishment year"
                    className="border outline-none p-3  w-80 md:w-full h-10 rounded-md"
                    value={yearOfStablishment}
                  />
                </div>
                <div className="space-y-2">
                  <h2>Company Website</h2>
                  <Input
                    size="lg"
                    label="Company_Website"
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    type="text"
                    name="Company_Website"
                    id="Company_Website"
                    className="border outline-none p-3 w-80 md:w-full h-10"
                    placeholder="Company Website Link"
                    value={companyWebsite}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h2>Company Vision</h2>
                <Textarea
                  size="lg"
                  label="Company Vision"
                  onChange={(e) => {
                    setCompanyVision(e.target.value);
                    setCountVision(500 - e.target.value.length);
                  }}
                  name="company_vision "
                  id="company_vision"
                  cols="30"
                  rows="10"
                  className="border outline-none p-3 w-96 md:w-full rounded-md"
                  value={companyVision}
                  maxLength={500}
                />

                <p
                  className={`${
                    countVision == 0 ? "text-red-500" : "text-black"
                  } flex justify-end`}
                >
                  {countVision > 0
                    ? countVision
                    : "Not more than 500 characters"}
                </p>
              </div>
              <div></div>
            </div>
          )}
          {activeStep == 2 && (
            <div className="flex flex-col gap-2">
              <h2>Social Media Link</h2>
              <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <div>
                    <p className="text-sm text-slate-500">Link {index + 1}</p>
                    <div key={index} className="flex">
                      <select
                        value={link.name}
                        onChange={(e) =>
                          updateLink(index, {
                            ...link,
                            name: e.target.value,
                          })
                        }
                        className="border py-2 px-5 text-gray-600  "
                      >
                        {socialMediaPlatforms.map((value, index) => {
                          return (
                            <option
                              key={index}
                              value={value}
                              selected={value == links.name}
                            >
                              {value}
                            </option>
                          );
                        })}

                        {/* Add other social media options here */}
                      </select>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          updateLink(index, {
                            ...link,
                            url: e.target.value,
                          })
                        }
                        className="outline-none border w-56 md:w-full px-2"
                        placeholder="Profile link/url ..."
                      />
                      <button
                        onClick={(e) => removeLink(e, index)}
                        className="w-10 border bg-slate-200"
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addLink}
                  className="border-2 p-1 bg-slate-200 w-80 md:w-full rounded-md hover:bg-blue-500 hover:text-white font-bold text-sm py-3 text-blue-300 border-blue-300"
                >
                  Add New Social Link
                </button>
              </div>
            </div>
          )}

          {activeStep == 3 && (
            <div className="flex flex-col gap-3 w-80 md:w-full">
              <h2>Phone</h2>

              <div className="flex">
                <input
                  width={10}
                  label="Country code"
                  type="text"
                  name="country_code"
                  id="country code"
                  className="outline-none border p-2 w-20 border-gray-400 rounded-l-md"
                  readOnly
                  value="+251"
                />
                <Input
                  size="lg"
                  label="Phone"
                  type="text"
                  name="Phone"
                  id="Phone"
                  className="outline-none border w-full p-2"
                  placeholder="Phone Number ..."
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
              <h2>Location</h2>
              <Input
                size="lg"
                label="Location"
                type="text"
                name="Location"
                id="Location"
                className="outline-none border w-full p-2"
                placeholder="Location   ..."
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
              <h2>Email</h2>
              <Input
                size="lg"
                label="Email"
                type="email"
                name="Email"
                id="Email"
                className="outline-none border w-full p-2"
                placeholder="johndoe@example.com   ..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          )}

          {activeStep == 4 && (
            <div className="space-y-5 w-80 md:w-full">
              <h2>Password</h2>

              <div className="">
                <Input
                  label="Password"
                  size="lg"
                  icon={
                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setHiddenPassword(!hiddenPassword);
                      }}
                    >
                      {hiddenPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
                    </button>
                  }
                  type={hiddenPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={(e) => setPassord(e.target.value)}
                />
              </div>

              <div className="flex border rounded-sm">
                <Input
                  size="lg"
                  label="Confirm Password"
                  type={hiddenConfirmPassword ? "password" : "text"}
                  icon={
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setHiddenConfirmPassword(!hiddenConfirmPassword);
                      }}
                    >
                      {hiddenConfirmPassword ? (
                        <IoEyeOutline />
                      ) : (
                        <IoEyeOffOutline />
                      )}{" "}
                    </div>
                  }
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="confirm password"
                  onChange={(e) => setConfirmPassord(e.target.value)}
                />
              </div>

              <div className=" space-y-2 w-1/2">
                <p className="text-lg font-semibold">Delete Your Account</p>
                <p className="text-sm w-2/3 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
                  recusandae fugiat facere maiores facilis eius ipsa temporibus
                  est pariatur similique consequatur excepturi, quam qui magni
                  neque odio, molestias aspernatur dolore!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpen();
                    }}
                    className="rounded-md py-2 px-3 flex gap-2 text-red-300 hover:text-white hover:bg-red-300 border-2  border-red-300 "
                  >
                    {" "}
                    <CloseRoundedIcon className="border border-red-500 rounded-full " />{" "}
                    Delete Account
                  </button>

                  {errorMessage && <p>{errorMessage}</p>}
                  <div className="flex gap-5">
                    <button
                      type="submit"
                      className="hover:bg-blue-500 hover:text-white py-2 px-16 border-2 border-blue-500 text-blue rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      </form>
      <div>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Delete Account.</DialogHeader>
          <DialogBody>
            The key to more success is to have a lot of pillows. Put it this
            way, it took me twenty five years to get these plants, twenty five
            years of blood sweat and tears, and I&apos;m never giving up,
            I&apos;m just getting started. I&apos;m up to something. Fan luv.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={DeleteAccount}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default UpdateEmployer;
