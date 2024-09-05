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
    <div className="font-serif ml-5 lg:ml-0">
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
        <div className="flex flex-col gap-2">
          <h2>Profile Picture</h2>

          <div className="lg:grid grid-flow-row-dense grid-cols-3    gap-5">
            {/* for uploading logo */}
            <div className="flex flex-col gap-2">
              <h2>Upload Profile Picture</h2>
              <div
                className={`flex flex-col gap-2 border border-black justify-center lg:w-full border-dashed  bg-zinc-100 `}
              >
                <div
                  {...getRootPropsLogo()}
                  className=" flex flex-col justify-center items-center p-5 w-full h-full"
                >
                  <input {...getInputPropsLogo()} />
                  {isLogoDragActive ? (
                    <p
                      className={`absolute  px-24 py-16  bg-slate-300 text-black`}
                    >
                      Drop the Your Profile Picture here
                    </p>
                  ) : (
                    <div className=" flex flex-col ">
                      {logo ? (
                        <p className="my-2">
                          selected Profile Picture : {logo["path"]}
                        </p>
                      ) : (
                        <div className=" ">
                          <img
                            src={`http://localhost:8000/${user.profile_picture}`}
                            alt=""
                            className=""
                          />
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
            <h2>Full Name</h2>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              name="company_name"
              id="company_name"
              className="border outline-none p-3 w-80 md:w-full h-10  bg-zinc-100"
              value={full_name}
              placeholder="Enter Your Company Name "
            />
          </div>
        </div>

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
              {hiddenConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
            </div>
          </div>
        {
          user.status=="super_admin"&&(
            <div className=" space-y-2 w-1/2">
            <p className="text-lg font-semibold">Delete Your Account</p>
            <p className="text-sm w-2/3 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
              recusandae fugiat facere maiores facilis eius ipsa temporibus est
              pariatur similique consequatur excepturi, quam qui magni neque
              odio, molestias aspernatur dolore!
            </p>
            <button className="rounded-md py-2 px-3 flex gap-2 text-red-300 hover:text-white hover:bg-red-300">
              {" "}
              <CloseRoundedIcon className="border border-red-500 rounded-full" />{" "}
              Delete Account
            </button>
          </div>
          )
        }
          {errorMessage && <p>{errorMessage}</p>}
          <div className="flex gap-5">
            <button type="submit" className="bg-blue-500 py-3 px-10 text-white">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterEmployer;
