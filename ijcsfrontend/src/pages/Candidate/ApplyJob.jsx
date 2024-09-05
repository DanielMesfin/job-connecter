import React from "react";
import { useState } from "react";
import axios from "axios";
const PostJob = () => {
  const sallaryTypeList = ["Monthly", "Fixed", "Per Task", "Hourly"];
  const educationList = ["BSC", "BA"];
  const jobTypeList = ["Permanent", "Contract", "per hour"];
  const jobLevelList = ["Entermediate", "Mid-Level", "Experienced"];
  const regionslist = [
    "Addis Ababa",
    "Afar Region",
    "Amhara Region",
    "Benishangul-Gumuz Region",
    "Dire Dawa",
    "Gambela Region",
    "Harari Region",
    "Oromia Region",
    "Sidama Region",
    "Somali Region",
    "South Ethiopia Region",
    "South Western Ethiopia",
    "Southern Nations, Nationalities, and Peoples' Region",
    "Tigray Region",
  ];

  const [countVision, setCountVision] = useState(500);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTag, setJobTag] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 0 });

  const [minSallary, setMinSallary] = useState();
  const [maxSallary, setMaxSallary] = useState();
 

  const [salaryType, setSalaryType] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [vacancies, setVacancies] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [jobLevel, setJobLevel] = useState("");
  const [location, setLocation] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState();

  const [responsibility, setResponsibility] = useState([""]);
  const [requiredSkill, setRequiredSkill] = useState([""]);

  const [jobBenefits, setJobBenefits] = useState([""]);
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState();
  const [region, setRegion] = useState(regionslist[0]);
  const [address,setAddress]=useState({region:'',additionalAddress:''})

  // address addition
  const addAdditionalAddress = () => {
    setAdditionalAddress({ region: "", additional: "" });
  };
  const updateAdditionalAddress = (index, updatedAdditionalAddress) => {
    setAdditionalAddress(
      additionalAddress.map((address, i) =>
        i === index ? updatedAdditionalAddress : address
      )
    );
  };
  const removeAdditionalAddress = (index) => {
    setAdditionalAddress(additionalAddress.filter((_, i) => i !== index));
  };

  // skill requirement
  const addSkillRequirement = () => {
    setRequiredSkill([...requiredSkill, ""]);
  };

  const updateSkillRequirement = (index, updatedSkill) => {
    setRequiredSkill(
      requiredSkill.map((skill, i) => (i === index ? updatedSkill : skill))
    );
  };

  const removeSkillRequirement = (index) => {
    setRequiredSkill(requiredSkill.filter((_, i) => i !== index));
  };

  // required responsibility
  const addResponsibility = () => {
    setResponsibility([...responsibility, ""]);
  };

  const updateResponsibility = (index, updatedResponsibility) => {
    setResponsibility(
      responsibility.map((responsibility, i) =>
        i === index ? updatedResponsibility : responsibility
      )
    );
  };

  const removeResponsibility = (index) => {
    setResponsibility(responsibility.filter((_, i) => i !== index));
  };

  // job benefits
  const addJobBenefit = () => {
    setJobBenefits([...jobBenefits, ""]);
  };

  const updateJobBenefit = (index, updatedBenefit) => {
    setJobBenefits(
      jobBenefits.map((benefit, i) => (i === index ? updatedBenefit : benefit))
    );
  };

  const removeBenefit = (index) => {
    setJobBenefits(jobBenefits.filter((_, i) => i !== index));
  };

  // http://127.0.0.1:8000/job/post/

  const post_job = async (e) => {
    e.preventDefault();
    setSalaryRange({min:minSallary,max:maxSallary});
    setAddress({region:region,additionalAddress:additionalAddress});

    console.log({
      jobTitle,
      jobTag,
      jobRole,
      salaryRange,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      deadline,
      jobLevel,
      location,
  
      jobBenefits,
      jobDescription,
      address,
      responsibility,
      requiredSkill
    });


    let date = new Date();
let formattedDate = date.toISOString().split('T')[0];

    let formData = new FormData();
    formData.append("title", jobTitle);
    formData.append("tag", jobTag);
    formData.append("salary", JSON.stringify(salaryRange));
    formData.append("salaryType", salaryType);
    formData.append("education", education);
    formData.append("req_experience", experience);
    formData.append("job_category", jobType);
    formData.append("job_type", jobType);
    formData.append("vacancies", vacancies);
    formData.append("deadline", deadline);
    formData.append("jobLevel", jobLevel);
    formData.append("location", location);
    formData.append(
      "additionalAddress",
      JSON.stringify({ region: region, additional: additionalAddress })
    );
    formData.append("jobBenefits", JSON.stringify(jobBenefits));
    formData.append("job_description", jobDescription);
    formData.append("responsiblity",JSON.stringify(responsibility));
    formData.append("required_skill",JSON.stringify(requiredSkill));
    formData.append("employer",3);
    formData.append("post_date",formattedDate);

    await axios
      .post("http://127.0.0.1:8000/job/post/", formData, {
        headers: {
          "X-CSRFToken": "here is the crf code",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((value) => {
        console.log(value.data);
        alert("Job Posting successfull !");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="space-y-5 p-10" onSubmit={(e) => post_job(e)}>
        <h1 className="mb-5">Post a Job</h1>
        <div>
          <h2>Job Title</h2>
          <input
            type="text"
            name="job_title"
            id="job_title"
            placeholder="Enter Job Title here ..."
            className="border outline-none p-3 w-full h-10  bg-zinc-100"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <h2>Tags</h2>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Enter Job tag here ..."
              className="border outline-none p-3 w-full h-10  bg-zinc-100"
              onChange={(e) => setJobTag(e.target.value)}
            />
          </div>
          <div>
            <h2>Job Role</h2>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Enter Job Role here ..."
              className="border outline-none p-3 w-full h-10  bg-zinc-100"
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-3">Sallary</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <h2>Min. Sallary</h2>
              <div className="flex">
                <input
                  type="text"
                  name="min_sallary"
                  id="min_sallary"
                  className="border outline-none p-3 w-full h-10  bg-zinc-100"
                  placeholder="Enter minimum Sallary here ..."
                  onChange={(e) => setMinSallary(e.target.value)}
                  value={minSallary}
                />
                <input
                  type="text"
                  name="currency"
                  id="currency"
                  value={"USD"}
                  readOnly
                  className="border outline-none text-center w-10 bg-gray-300 rounded-tr-md rounded-br-md"
                />
              </div>
            </div>
            <div>
              <h2>Max. Sallary</h2>
              <div className="flex">
                <input
                  type="text"
                  name="max_sallary"
                  id="max_sallary"
                  className="border outline-none p-3 w-full h-10  bg-zinc-100"
                  placeholder="Enter maximum Sallary here ..."
                  onChange={(e) => setMaxSallary(e.target.value)}
                  value={maxSallary}
                />
                <input
                  type="text"
                  name="currency"
                  id="currency"
                  value={"USD"}
                  readOnly
                  className="border outline-none text-center w-10 bg-gray-300 rounded-tr-md rounded-br-md"
                />
              </div>
            </div>
            <div>
              <h2>Sallary Type</h2>
              <select
                name="salary_type"
                id="salary_type"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setSalaryType(e.target.value)}
              >
                {sallaryTypeList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-3">Advanced Information</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <h2>Education</h2>
              <select
                name="education"
                id="education"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setEducation(e.target.value)}
              >
                {educationList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <h2>Experience</h2>
              <input
                type="number"
                name="experience"
                id="experience"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                placeholder="Enter Experience here ..."
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <h2>Job Type</h2>
              <select
                name="salary_type"
                id="salary_type"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setJobType(e.target.value)}
              >
                {jobTypeList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <h2>Vacancies</h2>
              <input
                type="number"
                name="vacancies"
                id="vacancies"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                placeholder="Enter number of positions ..."
                onChange={(e) => setVacancies(e.target.value)}
              />
            </div>
            <div>
              <h2>Dead Line</h2>
              <input
                type="date"
                name="deadline"
                id="deadline"
                className="border outline-none p-3 w-full h-10"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div>
              <h2>Job Level</h2>
              <select
                name="job_level"
                id="job_level"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setJobLevel(e.target.value)}
              >
                {jobLevelList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2">Location</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h2>Region</h2>
              <select
                name="job_level"
                id="job_level"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setRegion(e.target.value)}
              >
                {regionslist.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <h2>Additional Address</h2>
              <input
                type="text"
                name="additional_address_info"
                id="additional_address_info"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                placeholder="Enter Additional Address here ..."
                onChange={(e) => setAdditionalAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2>Required Skill</h2>
          <div className="flex flex-col gap-2">
            {requiredSkill.map((link, index) => (
              <div>
                <p className="text-sm text-slate-500">skill {index + 1}</p>
                <div key={index} className="flex">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      updateSkillRequirement(index, e.target.value)
                    }
                    className="outline-none border w-full h-10 px-2"
                    placeholder="Enter Job benefits here ..."
                  />

                  <button
                    onClick={() => removeSkillRequirement(index)}
                    className="w-10 border bg-blue-gray-100"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addSkillRequirement}
              className="border py-2 bg-blue-gray-100"
            >
              Add Skill Requirement
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2>Responsiblities</h2>
          <div className="flex flex-col gap-2">
            {responsibility.map((link, index) => (
              <div>
                <p className="text-sm text-slate-500">
                  Responsiblity {index + 1}
                </p>
                <div key={index} className="flex">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) =>
                      updateResponsibility(index, e.target.value)
                    }
                    className="outline-none border w-full h-10 px-2"
                    placeholder="Enter Job benefits here ..."
                  />

                  <button
                    onClick={() => removeResponsibility(index)}
                    className="w-10 border bg-blue-gray-100"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addResponsibility}
              className="border py-2 bg-blue-gray-100"
            >
              Add Responsiblity
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2>Job Benefit</h2>
          <div className="flex flex-col gap-2">
            {jobBenefits.map((link, index) => (
              <div>
                <p className="text-sm text-slate-500">benefit {index + 1}</p>
                <div key={index} className="flex">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateJobBenefit(index, e.target.value)}
                    className="outline-none border w-full h-10 px-2"
                    placeholder="Enter Job benefits here ..."
                  />

                  <button
                    onClick={() => removeBenefit(index)}
                    className="w-10 border bg-blue-gray-100"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addJobBenefit}
              className="border py-2 bg-blue-gray-100"
            >
              Add Benefit
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h2>Job Description</h2>
          <textarea
            onChange={(e) => {
              setJobDescription(e.target.value);
              setCountVision(500 - e.target.value.length);
            }}
            name="job_description"
            id="job_description"
            cols="30"
            rows="8"
            className="border outline-none p-3 w-full rounded-md"
            placeholder="Add your job description"
            maxLength={500}
          ></textarea>
          <p
            className={`${
              countVision == 0 ? "text-red-500" : "text-black"
            } flex justify-end`}
          >
            {countVision > 0 ? countVision : "Not more than 500 characters"}
          </p>
        </div>
        <div className="flex gap-5">
          {/* <button   className="bg-slate-200 py-3 px-10">Previous</button> */}
          <button type="submit" className="bg-blue-500 py-3 px-10 text-white">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};
export default PostJob;