import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Job_Seeker_Signup_Form = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [educations, setEducations] = useState([{ key: "main", faculity: "" }]);
  const [skills, setSkills] = useState({skills:[{}]});
  const [agree, setAgree] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const navigate = useNavigate();

  const registerJobSeeker = async () => {
    let formField = new FormData();

    formField.append("first_name", first_name);
    formField.append("last_name", last_name);
    formField.append("phone", phone);
    formField.append("email", email);
    formField.append("password", password);
    formField.append("faculity", educations);
    formField.append("skills", skills);
    formField.append("gender", gender);
    formField.append("location", location);

    await axios({
      method: "post",
      url: "http://localhost:8000/jobseekerapi/",
      data: formField,
    })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  const handleSubmit = (event) => {
    console.log(
      first_name,
      last_name,
      phone,
      email,
      password,
      educations,
      skills,
      gender,
      location
    );
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="shadow p-6 w-[700px]">
        <div className="">
          <label htmlFor="" className="w-[20%] mb-3">
            First Name
          </label>
          <input
            className="border ml-7 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            type="text"
            name="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="" className="w-[20%] mb-3">
            Last Name
          </label>
          <input
            className="border ml-7 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            type="text"
            name="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="" className="w-[20%] mb-3">
            Phone No
          </label>
          <input
            className="border ml-7 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="" className="w-[20%] mb-3">
            Your Email
          </label>
          <input
            className="border ml-7 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border ml-7 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordMatchError(false);
            }}
          />
        </div>
        <div className="">
          <label htmlFor="confirmPassword">Confirm</label>
          <input
            type="password"
            id="confirmPassword"
            className="border ml-7 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordMatchError(false);
            }}
            style={{ borderColor: passwordMatchError ? "red" : "" }}
          />
          {passwordMatchError && (
            <p style={{ color: "red" }}>Passwords do not match.</p>
          )}
        </div>
        <div className="">
          <label htmlFor="" className="w-[20%] mb-3">
            Location
          </label>
          <input
            className="border ml-10 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            name="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          {educations.map((education, index) => (
            <div key={education.key}>
              <div className="flex items-center">
                <label className="w-[20%] mb-3">
                  {index === 0 ? "Main Field" : "Sub Field"}
                </label>
                <input
                  type="text"
                  name="faculity"
                  placeholder="Faculity"
                  className={
                    index !== 0
                      ? "ml-4 mb-3 pl-2 border h-11 w-[90%] focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
                      : "border pl-2 -ml-1 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
                  }
                  value={education.faculity}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const updatedData = [...educations];
                    updatedData[index][name] = value;
                    setEducations(updatedData);
                  }}
                />
                {index !== 0 && (
                  <FaMinus
                    className="plus-icon bg-red-500 rounded-full p-[1px] ml-1 text-white text-2xl"
                    onClick={() => {
                      const updatedData = [...educations];
                      updatedData.splice(index, 1);
                      setEducations(updatedData);
                    }}
                  />
                )}
              </div>
              {index === educations.length - 1 && (
                <FaPlus
                  className="plus-icon bg-green-500 text-white ml-7 p-[1px] text-2xl"
                  onClick={() => {
                    const lastIndex = educations.length - 1;
                    const newKey = `sub${lastIndex}`;
                    setEducations([
                      ...educations,
                      { key: newKey, faculity: "" },
                    ]);
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-gray-400">
          <strong>Education Data:</strong>
          <span>{JSON.stringify({ educations }, null, 2)}</span>
        </div>
        <div>
      <div>
      <div>
        <strong className="text-gray-400">Your Skills Are:</strong>
        <span className="text-gray-400">{JSON.stringify(skills, null, 2)}</span>
      </div>
      <div>
      <div>
        <strong className="text-gray-400">Your Skills Are:</strong>
        <pre className="text-gray-400">{JSON.stringify(skills, null, 2)}</pre>
      </div>
      {skills.skills.map((skill, index) => (
        <div key={Object.keys(skill)[0]}>
          <input
            type="text"
            placeholder="Skill"
            className="border pl-2 h-11 w-[77%] mb-3 focus:outline-none focus:shadow-outline rounded focus:border-blue-500 focus:ring-blue-500"
            value={Object.values(skill)[0]}
            onChange={(e) => {
              const value = e.target.value;
              const skillsArray = value.split(',').map((skill) => skill.trim());
              const updatedData = { ...skills };
              updatedData.skills[index] = { [index + 1]: skillsArray.reduce((acc, cur, i) => ({ ...acc, [i + 1]: cur }), {}) };
              setSkills(updatedData);
            }}
          />
        </div>
      ))}
    </div>
    </div>
    </div>
        <div className="flex mt-2 mb-6">
          <label className="ml-9 mr-10">Gender</label>
          <div className="flex items-center mr-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-700">Male</span>
            </label>
          </div>
          <div className="flex items-center mr-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-700">Female</span>
            </label>
          </div>
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-700">Other</span>
            </label>
          </div>
        </div>
        <div class="flex items-center ml-6 mb-8">
          <label
            class="relative flex items-center p-3 rounded-full cursor-pointer"
            htmlFor="link"
          >
            <input
              type="checkbox"
              class="before:content[''] peer relative h-6 w-6 cursor-pointer  
        appearance-none rounded-0 border border-blue-gray-200 transition-all 
        before:absolute before:top-2/4 before:left-2/4 before:block 
        before:h-12 before:w-12 before:-translate-y-2/4 
        before:-translate-x-2/4 before:rounded-full
        before:bg-blue-gray-500 before:opacity-0 before:transition-opacity
        checked:border-none checked:bg-blue-500 checked:before:bg-blue-400 
        hover:before:opacity-10"
              id="link"
              checked={agree}
              value={agree}
              onChange={() => setAgree(!agree)}
            />
            <span
              class="absolute text-white transition-opacity 
        opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 
        -translate-x-2/4 peer-checked:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <label
            class="mt-px font-light text-gray-700 cursor-pointer select-none ml-2"
            htmlFor="link"
          >
            <p
              class="flex font-sans text-base antialiased font-medium leading-relaxed
        text-blue-gray-900"
            >
              I agree with the
              <a
                href="#"
                class="block font-sans text-base antialiased 
          font-medium leading-relaxed text-blue-500 
          transition-colors hover:text-blue-700"
              >
                &nbsp;terms and conditions
              </a>
              .
            </p>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={registerJobSeeker}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Job_Seeker_Signup_Form;
