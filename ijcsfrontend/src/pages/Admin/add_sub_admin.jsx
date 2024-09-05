import React, { useCallback, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import { useDropzone } from "react-dropzone";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { Input, Select, Option, Radio, Button } from "@material-tailwind/react";
const AddSubAdmin = (props) => {
  const { user } = useUserContext();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const [password, setPassord] = useState();
  const [confirmPassword, setConfirmPassord] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [profile_picture, setProfilePicture] = useState();
  const [full_name, setFullName] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const access_level = [
    {
      "Super Admin": "super_admin",
    },
    { "Sub Admin": "admin" },
  ];

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

  const [accessLevel, setAccessLevel] = useState(""); // Initialize state for selected value

  const handleSelectChange = (event) => {
    const selectedKey = event.target.value; // Get the selected key
    const correspondingValue = access_level.find(
      (item) => Object.keys(item)[0] === selectedKey
    ); // Find the corresponding value
    setAccessLevel(Object.values(correspondingValue)[0]); // Update state with the value
  };

  const CreateAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", profile_picture);
    formData.append("full_name", full_name);
    formData.append("access_level", accessLevel);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);

    if (password == confirmPassword && password.length >= 8) {
      setErrorMessage("");
      await axios
        .post(`http://127.0.0.1:8000/admins/create/`, formData, {
          headers: {
            "X-CSRFToken": "here is the crf code",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((value) => {
          console.log(value.data);
          setErrorMessage("");
          setMessage("Sub Admin Added Successfull");

          // navigate("/succeedRegisterEmployer");
        })
        .catch((err) => {
          console.log(err);
          setMessage("");
          setErrorMessage("Sub Admin Registration Failed ! Please Try Again");
        });
    } else {
      password.length < 8
        ? setErrorMessage("password length must be 8 or more ...")
        : password != confirmPassword
        ? setErrorMessage("Password does not match !")
        : setErrorMessage("");
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
      <form onSubmit={(e) => CreateAccount(e)} className="">
        <div className="flex flex-col gap-2">
          <h2>Profile Picture</h2>

          <div className="lg:grid grid-flow-row-dense grid-cols-3    gap-5">
            {/* for uploading logo */}

            <div className="flex flex-col gap-2">
              <h2>Upload Profile Picture</h2>
              <div className="flex flex-col gap-2 border border-black py-10 justify-center lg:w-full border-dashed  bg-zinc-100 rounded-lg">
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
                      {profile_picture ? (
                        <p className="my-2">
                          selected Logo : {profile_picture["path"]}
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

          <div className="w-full space-y-2">
            <h2>Access Level</h2>
            <Select
              label="Access Level"
              size="lg"
              onChange={handleSelectChange}
              className="border py-2 px-5 w-80 md:w-full"
            >
              {access_level.map((value, index) => (
                <Option key={index} value={Object.keys(value)[0]}>
                  {Object.keys(value)[0]}
                </Option>
              ))}
            </Select>
          </div>

          <hr />
          <div className="space-y-2">
            <h2>Full Name</h2>
            <Input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              name="company_name"
              id="company_name"
              className="  p-3 w-80 md:w-full h-10  bg-zinc-100"
              value={full_name}
              label="Full Name "
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
              className="outline-none border p-2 w-20 rounded-l-lg"
              readOnly
              value="+251"
            />
            <Input
              size="lg"
              type="text"
              name="Phone"
              id="Phone"
              className="  w-full p-2"
              label="Phone Number ..."
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <h2>Email</h2>
          <Input
            size="lg"
            type="email"
            name="Email"
            id="Email"
            className="outline-none border w-full p-2"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="space-y-5 w-80 md:w-full">
          <h2>Password</h2>

          <div className="flex border rounded-sm">
            <Input
              size="lg"
              type={hiddenPassword ? "password" : "text"}
              name="password"
              id="password"
              className="  w-full p-2 "
              label="password"
              onChange={(e) => setPassord(e.target.value)}
              icon={
                <div
                  className="  cursor-pointer"
                  onClick={() => {
                    setHiddenPassword(!hiddenPassword);
                  }}
                >
                  {hiddenPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
                </div>
              }
            />
          </div>

          <div className="flex  ">
            <Input
              size="lg"
              type={hiddenConfirmPassword ? "password" : "text"}
              name="confirm_password"
              id="confirm_password"
              className="outline-none   w-full p-2  "
              label="confirm password"
              onChange={(e) => setConfirmPassord(e.target.value)}
              icon={
                <div
                  className=" cursor-pointer"
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
};
export default AddSubAdmin;
