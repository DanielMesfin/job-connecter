import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab } from "../../components/tabs";

import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useUserContext } from "../../context/context";
import { Button, Input } from "@material-tailwind/react";

function UpdateAdmin() {
  const { user } = useUserContext();

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const [password, setPassord] = useState();
  const [confirmPassword, setConfirmPassord] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [profile_picture, setProfilePicture] = useState();
  const [full_name, setFullName] = useState(user.full_name);

  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const onDropLogo = useCallback((acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    setProfilePicture(file);
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps: getRootPropsLogo,
    getInputProps: getInputPropsLogo,
    isDragActive: isLogoDragActive,
  } = useDropzone({ onDrop: onDropLogo });

  const Update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", profile_picture);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    await axios
      .patch(`http://127.0.0.1:8000/admins/update/${user.id}/`, formData, {
        headers: {
          "X-CSRFToken": "here is the crf code",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((value) => {
        console.log(value.data);
        setErrorMessage("");
        setMessage("Profile Update Successfull");

        // navigate("/succeedRegisterEmployer");
      })
      .catch((err) => {
        console.log(err);
        setMessage("");
        setErrorMessage("Profile Updating Failed ! Please Try Again");
      });

    console.log(profile_picture, full_name, email, phone);
    // }
    // else {
    //   setErrorMessage("Password does not match !");
    // }
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
                className={`flex flex-col gap-2 border border-black justify-center lg:w-full border-dashed  bg-zinc-100 rounded-lg`}
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
                      {profile_picture ? (
                        <p className="my-2">
                          selected Profile Picture : {profile_picture["path"]}
                        </p>
                      ) : (
                        <div className="h-32">
                          <img
                            src={`http://localhost:8000${user.profile_picture}`}
                            alt=""
                            className="h-32 lg:h-[9rem]"
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
            <Input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              name="company_name"
              id="company_name"
              className="border outline-none p-3 w-80 md:w-full h-10  bg-zinc-100"
              value={full_name}
              label="Full Name"
              size="lg"
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
              className="outline-none border p-2 w-20 rounded-l-lg border-gray-500"
              readOnly
              value="+251"
            />
            <Input
              type="text"
              name="Phone"
              id="Phone"
              className="outline-none border w-full p-2"
              label="Phone Number ..."
              size="lg"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <h2>Email</h2>
          <Input
            type="email"
            name="Email"
            id="Email"
            className="outline-none border w-full p-2"
            label="johndoe@example.com   ..."
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="space-y-5 w-80 md:w-full">
          <h2>Password</h2>

          <div className="flex border rounded-sm">
            <Input
              type={hiddenPassword ? "password" : "text"}
              name="password"
              id="password"
              className=" w-full p-2 "
              label="password"
              size="lg"
              onChange={(e) => setPassord(e.target.value)}
              icon={
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setHiddenPassword(!hiddenPassword);
                  }}
                >
                  {hiddenPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
                </div>
              }
            />
          </div>

          <div className="flex border rounded-sm">
            <Input
              type={hiddenConfirmPassword ? "password" : "text"}
              name="confirm_password"
              id="confirm_password"
              className=" w-full p-2 "
              label="confirm password"
              size="lg"
              onChange={(e) => setConfirmPassord(e.target.value)}
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
            />
          </div>
          {user.status == "super_admin" && (
            <div className=" space-y-2 w-1/2">
              <p className="text-lg font-semibold">Delete Your Account</p>
              <p className="text-sm w-2/3 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
                recusandae fugiat facere maiores facilis eius ipsa temporibus
                est pariatur similique consequatur excepturi, quam qui magni
                neque odio, molestias aspernatur dolore!
              </p>
              <button className="rounded-md py-2 px-3 flex gap-2 text-red-300 hover:text-white hover:bg-red-300">
                {" "}
                <CloseRoundedIcon className="border border-red-500 rounded-full" />{" "}
                Delete Account
              </button>
            </div>
          )}
          {errorMessage && <p>{errorMessage}</p>}
          <div className="flex gap-5">
            <Button type="submit" className="bg-blue-500 py-3 px-10 text-white">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateAdmin;
