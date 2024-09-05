import React, { useCallback, useState } from "react";
import { Tabs, Tab } from "../../components/tabs";

import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function RegisterEmployer(props) {
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

  const navigate = useNavigate();

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const [password, setPassord] = useState();
  const [confirmPassword, setConfirmPassord] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [company_names, setCompanyName] = useState();
  const [about_us, setAboutUs] = useState();
  const [location, setLocation] = useState();
  const [organizationType, setOrganizationType] = useState(
    OrganizationTypes[0]
  );
  const [industryType, setIndustryType] = useState(industries[0]);
  const [teamSize, setTeamSize] = useState();
  const [yearOfStablishment, setYearOfStablishment] = useState();
  const [companyWebsite, setCompanyWebsite] = useState();
  const [companyVision, setCompanyVision] = useState();
  //need to be array
  const [socialMediaLink, setSocialMediaLink] = useState();

  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const [links, setLinks] = useState([{ name: "", url: "" }]);
  const [countAboutUs, setCountAboutUs] = useState(1000);
  const [countVision, setCountVision] = useState(500);

  const addLink = () => {
    setLinks([...links, { name: "", url: "" }]);
  };

  const updateLink = (index, updatedLink) => {
    setLinks(links.map((link, i) => (i === index ? updatedLink : link)));
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const onDropLogo = useCallback((acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    setLogo(file);
    console.log(acceptedFiles);
  }, []);
  const onDropBanner = useCallback((acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
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

  const Register = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("banner", banner);
    formData.append("first_name", company_names);
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
    formData.append("confirm_password", confirmPassword);
    formData.append("is_employer", true);

    if (password == confirmPassword) {
      password.length < 8
        ? setErrorMessage("password length must be 8 or more ...")
        : setErrorMessage("");
      // const formData1 = {
      //   logo: logo,
      //   banner: banner,
      //   first_name: company_names,
      //   username: company_names,
      //   email: email,
      //   location: location,
      //   socialMediaLink: links,
      //   phone: phone,
      //   about: about_us,
      //   vision: companyVision,
      //   organizationType: organizationType,
      //   industryType: industryType,
      //   numberOfEmployees: teamSize,
      //   yearOfStablishment: yearOfStablishment,
      //   portifolio: companyWebsite,
      //   password: "abcdefghij12345",
      //   confirm_password: "abcdefghij12345",
      // };

      await axios
        .post("http://127.0.0.1:8000/employer/register/", formData, {
          headers: {
            "X-CSRFToken": "here is the crf code",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((value) => {
          console.log(value.data);

          navigate("/succeedRegisterEmployer");
        })
        .catch((err) => console.log(err));

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
    } else {
      setErrorMessage("Password does not match !");
    }
  };

  return (
      <div className="font-serif ml-5 lg:ml-0 ">
        <form onSubmit={(e) => Register(e)} className="w-[60rem] m-auto justify-center">
          <Tabs>
            <Tab label="Company Info">
              <div className="flex flex-col gap-2">
                <h2>Logo and Banner Image</h2>

                <div className="lg:grid grid-flow-row-dense grid-cols-3 w-80  md:w-full  gap-5">
                  {/* for uploading logo */}
                  <div className="flex flex-col gap-2">
                    <h2>Upload Logo</h2>
                    <div className="flex flex-col gap-2 border border-black py-10 justify-center lg:w-full border-dashed  bg-zinc-100">
                      <div
                        {...getRootPropsLogo()}
                        className=" flex flex-col justify-center items-center p-5"
                      >
                        <input {...getInputPropsLogo()} />
                        {isLogoDragActive ? (
                          <p className="absolute px-24 py-16 bg-slate-300 text-black">
                            Drop the Your Logo here
                          </p>
                        ) : (
                          <div className=" flex flex-col justify-center items-center ">
                            {logo ? (
                              <p className="my-2">
                                selected Logo : {logo["path"]}
                              </p>
                            ) : (
                              <div>
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
                  <div className="flex flex-col col-span-2 gap-2">
                    <h2>Upload Banner</h2>
                    <div className="flex flex-col gap-2 border border-black border-dashed py-10   bg-zinc-100">
                      <div
                        {...getRootPropsBanner()}
                        className=" flex flex-col  justify-center items-center p-5"
                      >
                        <input {...getInputPropsBanner()} />
                        {isBannerDragActive ? (
                          <p className="absolute px-64 py-16 bg-slate-300 text-black">
                            Drop the Your Banner here
                          </p>
                        ) : (
                          <div className=" flex flex-col justify-center items-center ">
                            {banner ? (
                              <p className="my-2">
                                selected Banner : {banner["path"]}
                              </p>
                            ) : (
                              <div>
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
                </div>
                <hr />
                <div className="space-y-2">
                  <h2>Company Name</h2>
                  <input
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
                  <textarea
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
                  ></textarea>
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
            </Tab>
            <Tab label="Founding Info">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-7">
                  <div className="w-full space-y-2">
                    <h2>Organization Type</h2>
                    <select
                      name="OrganizationType"
                      id="OrganizationType"
                      className="border py-2 px-5 w-80 md:w-full"
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
                      className="border py-2 px-5 w-80 md:w-full"
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
                    <input
                      onChange={(e) => setTeamSize(e.target.value)}
                      type="number"
                      name="teamSize"
                      id="teamSize"
                      className="border outline-none p-3 w-80 md:w-full h-10 capitalize "
                      placeholder={`Number of Employees in ${
                        company_names ? company_names : "Your Comapany"
                      }`}
                      value={teamSize}
                    />
                  </div>
                  <div className="space-y-2">
                    <h2>Year of Establishment</h2>
                    <input
                      onChange={(e) => setYearOfStablishment(e.target.value)}
                      type="date"
                      name="stablishment year"
                      id="stablishment year"
                      className="border outline-none p-3  w-80 md:w-full h-10"
                      value={yearOfStablishment}
                    />
                  </div>
                  <div className="space-y-2">
                    <h2>Company Website</h2>
                    <input
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
                  <textarea
                    onChange={(e) => {
                      setCompanyVision(e.target.value);
                      setCountVision(500 - e.target.value.length);
                    }}
                    name="company_vision"
                    id="company_vision"
                    cols="30"
                    rows="10"
                    className="border outline-none p-3 w-96 md:w-full"
                    value={companyVision}
                    maxLength={500}
                  ></textarea>
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
            </Tab>
            <Tab label="Social Media Profile">
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
                            updateLink(index, { ...link, name: e.target.value })
                          }
                          className="border py-2 px-5 text-slate-600"
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
                            updateLink(index, { ...link, url: e.target.value })
                          }
                          className="outline-none border w-56 md:w-full px-2"
                          placeholder="Profile link/url ..."
                        />
                        <button
                          onClick={() => removeLink(index)}
                          className="w-10 border bg-slate-200"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addLink}
                    className="border p-1 bg-slate-200 w-80 md:w-full"
                  >
                    Add New Social Link
                  </button>
                </div>
              </div>
            </Tab>
            <Tab label="Contact">
              <div className="flex flex-col gap-3 w-80 md:w-full">
                <h2>Phone</h2>

                <div className="flex">
                  <input
                    type="text"
                    name="country_code"
                    id="country code"
                    className="outline-none border p-2 w-20"
                    readOnly
                    value="+251"
                  />
                  <input
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
                <input
                  type="text"
                  name="Location"
                  id="Location"
                  className="outline-none border w-full p-2"
                  placeholder="Location   ..."
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
                <h2>Email</h2>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  className="outline-none border w-full p-2"
                  placeholder="johndoe@example.com   ..."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </Tab>

            <Tab label="Password">
              <div className="space-y-5 w-80 md:w-full">
                <h2>Password</h2>

                <div className="flex border rounded-sm">
                  <input
                    type={hiddenPassword ? "password" : "text"}
                    name="password"
                    id="password"
                    className="outline-none border w-full p-2 border-none"
                    placeholder="password"
                    onChange={(e) => setPassord(e.target.value)}
                  />
                  <div
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => {
                      setHiddenPassword(!hiddenPassword);
                    }}
                  >
                    {hiddenPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
                  </div>
                </div>

                <div className="flex border rounded-sm">
                  <input
                    type={hiddenConfirmPassword ? "password" : "text"}
                    name="confirm_password"
                    id="confirm_password"
                    className="outline-none border w-full p-2 border-none"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassord(e.target.value)}
                  />
                  <div
                    className="px-4 py-3 cursor-pointer"
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
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="bg-blue-500 py-3 px-10 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </form>
      </div>
  );
}

export default RegisterEmployer;
