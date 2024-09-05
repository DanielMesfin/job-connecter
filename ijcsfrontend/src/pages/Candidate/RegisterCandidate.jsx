import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterCandidate(_props) {
  const fields = ["Main", "Sub"];

  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [educations, setEducations] = useState([{ key: "", field: "" }]);
  const [skills, setSkills] = useState([]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Functions to Handle Gender
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Functions For Passwords
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  //  Functions For Educations
  const addEducation = () => {
    setEducations([...educations, { key: "", field: "" }]);
  };
  const updateEducation = (index, updatedEducation) => {
    setEducations(
      educations.map((field, i) => (i === index ? updatedEducation : field))
    );
  };
  const removeEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };
  //  Functions For Skills
  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const Register = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("educations", JSON.stringify(educations));
    formData.append(
      "skills",
      JSON.stringify(skills.filter((skill) => skill.trim() !== ""))
    );
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("is_job_seeker",true)

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");

      await axios
        .post("http://127.0.0.1:8000/candidate/register/", formData)
        .then(() => {
          navigate("/succeedRegisterCandidate");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="font-serif flex justify-center mx-auto">
        <form onSubmit={(e) => Register(e)}>
          <div className="mt-6 shadow w-[600px] p-10">
            <div label="Candidate Info">
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <h2>First Name</h2>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="border outline-none p-3 w-full h-10  bg-zinc-100"
                    value={first_name}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <h2>Last Name</h2>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="border outline-none p-3 w-full h-10  bg-zinc-100"
                    value={last_name}
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 mt-4">
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div label="Education Profile">
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex flex-col gap-2">
                  {educations.map((education, index) => (
                    <div>
                      <p className="text-sm text-slate-500">
                        Field {index + 1}
                      </p>
                      <div key={index} className="flex">
                        <select
                          value={education.key}
                          onChange={(e) =>
                            updateEducation(index, {
                              ...education,
                              key: e.target.value,
                            })
                          }
                          className="border py-2 px-5 text-slate-600"
                        >
                          {fields.map((value, index) => {
                            return (
                              <option
                                key={index}
                                value={value}
                                selected={value == education.key}
                              >
                                {value}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          type="text"
                          value={education.field}
                          onChange={(e) =>
                            updateEducation(index, {
                              ...education,
                              field: e.target.value,
                            })
                          }
                          className="outline-none border w-full px-2"
                          placeholder="Software Engineering ..."
                        />
                        <button
                          onClick={() => removeEducation(index)}
                          className="w-10 border bg-slate-200 hover:text-red-600"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="border p-1 bg-slate-200"
                  >
                    Add Education
                  </button>
                </div>
              </div>
            </div>
            <div label="Skills" className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder="Enter Your Skill"
                    className="flex-grow mb-2 px-4 py-2 border rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="w-10 mb-2 border rounded-none bg-slate-200 border-l-0 hover:text-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full">
              <button
                type="button"
                onClick={handleAddSkill}
                className="border p-1 bg-slate-200 w-full"
              >
                Add Skill
              </button>
            </div>
            <div label="Contact" className="mt-4">
              <div className="flex flex-col gap-3">
                <h2>Phone</h2>
                <div className="flex">
                  <input
                    type="text"
                    name="country_code"
                    id="country code"
                    className="outline-none border p-2"
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
            </div>
            <div className="my-4">
              <div>
                <label htmlFor="gender" className="block text-gray-700 w-full">
                  Gender
                </label>
                <label className="inline-flex items-center mr-4 mt-3">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                    className="mr-2 w-5 h-5"
                  />
                  Male
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                    className="mr-2 w-5 h-5"
                  />
                  Female
                </label>
                <label className="inline-flex items-center ml-3">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={handleGenderChange}
                    className="mr-2 w-5 h-5"
                  />
                  Other
                </label>
              </div>
            </div>
            <div className="flex gap-5">
              <button
                type="submit"
                className="bg-blue-500 py-3 px-10 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterCandidate;
