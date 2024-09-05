import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";

const sallaryTypeList = ["Monthly", "Fixed", "Per Task", "Hourly"];
const educationList = ["BSC", "BA"];
const jobTypeList = ["Permanent", "Contract", "per hour"];
const jobLevelList = ["Entermediate", "Mid-Level", "Experienced"];

const jobCategoryList = ["On-site", "Remote", "hybrid"];
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
const sallaryChoices = ["Range", "fixed", "on-agreement"];
const currencyChoice = ["Birr", "USD"];

const UpdateJob = (props) => {
  const { user } = useUserContext();
  const [jobDetail, setJobDetail] = useState({});

  const [countVision, setCountVision] = useState(500);
  const [jobTitle, setJobTitle] = useState();
  const [jobTag, setJobTag] = useState();
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 0 });

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [minSallary, setMinSallary] = useState();
  const [maxSallary, setMaxSallary] = useState();
  const [fixedSallary, setFixedSallary] = useState();
  const [salaryType, setSalaryType] = useState(sallaryTypeList[0]);
  const [sallaryChoice, setSallaryChoice] = useState(sallaryChoices[0]);
  const [currency, setCurrency] = useState();

  const [education, setEducation] = useState(educationList[0]);
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState(jobTypeList[0]);
  const [jobCategory, setJobCategory] = useState(jobCategoryList[0]);

  const [vacancies, setVacancies] = useState();
  const [deadline, setDeadline] = useState();
  const [jobLevel, setJobLevel] = useState("");

  const [location, setLocation] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState();
  const [responsibility, setResponsibility] = useState([""]);
  const [requiredSkill, setRequiredSkill] = useState([""]);

  const [jobBenefits, setJobBenefits] = useState([""]);
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState();
  const [region, setRegion] = useState(regionslist[0]);
  const [address, setAddress] = useState({ region: "", additionalAddress: "" });

  const [jobId, setJobId] = useState();

  useEffect(() => {
    const getJob = async () => {
      const job_id = localStorage.getItem("job_id");
      setJobId(job_id);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/job/job_detail/${user.id}/${job_id}`
        );
        const jobDetailData = response.data["detail"];

        setJobDetail(jobDetailData);
        setErrorMessage("");
        setMessage("Job Detail Fetched Successfully");

        setJobTitle(jobDetailData.title || "");
        setJobTag((jobDetailData.tag || []).join(",") || "");
        setExperience(jobDetailData.req_experience || "");
        setEducation(jobDetailData.education || "");
        setJobType(jobDetailData.job_type || "");
        setJobLevel(jobDetailData.job_level || "");
        setJobRole(jobDetailData.job_role || "");
        setJobBenefits(jobDetailData.job_benefits || [""]);

        setJobCategory(jobDetailData.job_category || "");
        setRegion(jobDetailData.location.region);
        setAdditionalAddress(jobDetailData.location.additional);

        setVacancies(jobDetailData.vacancies || 0);
        setDeadline(jobDetailData.deadline || "");
        setLocation(jobDetailData.location || "");
        setResponsibility(jobDetailData.responsiblity || [""]);
        setRequiredSkill(jobDetailData.required_skill || [""]);
        setJobDescription(jobDetailData.job_description || "");

        if (jobDetailData.salary) {
          setSalaryType(jobDetailData.salary.sallaryType || "");
          setSallaryChoice(jobDetailData.salary.sallaryChoice || "");
          setCurrency(jobDetailData.salary.currency || "");

          switch (jobDetailData.salary.sallaryChoice) {
            case "fixed":
              setFixedSallary(jobDetailData.salary.sallary || "");
              break;
            case "Range":
              setMinSallary(jobDetailData.salary.sallary.min);
              setMaxSallary(jobDetailData.salary.sallary.max);
              break;
            case "on-agreement":
              break;
            default:
              break;
          }
        }
      } catch (err) {
        console.log(err);
        setMessage("");
        setErrorMessage("Failed to Fetch Job Detail! Please Try Again");
      }
    };

    getJob();
  }, [user.id]);

  // address addition
  const addAdditionalAddress = (e) => {
    e.preventDefault();
    setAdditionalAddress({ region: "", additional: "" });
  };
  const updateAdditionalAddress = (index, updatedAdditionalAddress) => {
    
    setAdditionalAddress(
      additionalAddress.map((address, i) =>
        i === index ? updatedAdditionalAddress : address
      )
    );
  };
  const removeAdditionalAddress = (e, index) => {
    e.preventDefault();
    setAdditionalAddress(additionalAddress.filter((_, i) => i !== index));
  };

  // skill requirement
  const addSkillRequirement = (e) => {
    e.preventDefault();
    setRequiredSkill([...requiredSkill, ""]);
  };

  const updateSkillRequirement = ( index, updatedSkill) => {
    
    setRequiredSkill(
      requiredSkill.map((skill, i) => (i === index ? updatedSkill : skill))
    );
  };

  const removeSkillRequirement = (e, index) => {
    e.preventDefault();
    setRequiredSkill(requiredSkill.filter((_, i) => i !== index));
  };

  // required responsibility
  const addResponsibility = (e) => {
    e.preventDefault();
    setResponsibility([...responsibility, ""]);
  };

  const updateResponsibility = ( index, updatedResponsibility) => {
    
    setResponsibility(
      responsibility.map((responsibility, i) =>
        i === index ? updatedResponsibility : responsibility
      )
    );
  };

  const removeResponsibility = (e, index) => {
    e.preventDefault();
    setResponsibility(responsibility.filter((_, i) => i !== index));
  };

  // job benefits
  const addJobBenefit = (e) => {
    e.preventDefault();
    setJobBenefits([...jobBenefits, ""]);
  };

  const updateJobBenefit = ( index, updatedBenefit) => {
   
    setJobBenefits(
      jobBenefits.map((benefit, i) => (i === index ? updatedBenefit : benefit))
    );
  };

  const removeBenefit = (e, index) => {
    e.preventDefault();
    setJobBenefits(jobBenefits.filter((_, i) => i !== index));
  };

  // http://127.0.0.1:8000/job/post/

  const UpdateJob = async (e) => {
    e.preventDefault();
    setSalaryRange({ min: minSallary, max: maxSallary });
    setAddress({ region: region, additionalAddress: additionalAddress });

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
      requiredSkill,
    });

    let date = new Date();
    let formattedDate = date.toISOString().split("T")[0];

    let formData = new FormData();
    formData.append("title", jobTitle);
    formData.append("post_date", formattedDate); //Post Date
    formData.append("tag", JSON.stringify(jobTag.split(","))); //Tag
    formData.append("education", education);
    formData.append("job_level", jobLevel);
    formData.append("job_role", jobRole);
    formData.append("vacancies", vacancies);
    formData.append("job_type", jobType);
    formData.append("job_category", jobCategory);
    formData.append("req_experience", experience);
    formData.append(
      "salary",
      JSON.stringify({
        sallaryType: salaryType,
        currency: currency,
        sallaryChoice: sallaryChoice,
        sallary:
          sallaryChoice == "Range"
            ? { min: minSallary, max: maxSallary }
            : sallaryChoice == "fixed"
            ? fixedSallary
            : "on-agreement",
      })
    );
    formData.append("deadline", deadline);

    formData.append(
      "location",
      JSON.stringify({ region: region, additional: additionalAddress })
    );
    formData.append("job_benefits", JSON.stringify(jobBenefits));
    formData.append("job_description", jobDescription);
    formData.append("responsiblity", JSON.stringify(responsibility));
    formData.append("required_skill", JSON.stringify(requiredSkill));

    await axios
      .patch(`http://127.0.0.1:8000/job/update/${jobId}/`, formData, {
        headers: {
          "X-CSRFToken": "here is the crf code",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((value) => {
        console.log(value.data);

        setErrorMessage("");
        setMessage("Job Posted Successfully");
      })
      .catch((err) => {
        setMessage("");
        setErrorMessage("Job Posting Failed ! Please Try Again");
        console.log(err);
      });
  };

  return (
    <div>
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
      <form className="space-y-5 py-5 " onSubmit={(e) => UpdateJob(e)}>
        <h1 className="mb-5 text-xl font-semibold">Post a Job</h1>
        <div className="border border-black p-5 rounded-md flex flex-col gap-3">
          <p className="font-bold">Basic Information</p>
          <div className="space-y-5">
            <div>
              <h2>Job Title</h2>
              <input
                type="text"
                name="job_title"
                id="job_title"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                value={jobTitle}
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
                  value={jobTag}
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
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border border-black p-5 rounded-md">
          <div className="gap-3">
            <h2 className="font-bold">Sallary</h2>
            <div className="flex justify-center items-center gap-3 border w-fit p-3 rounded-md">
              {sallaryChoices.map((value, index) => {
                return (
                  <label
                    htmlFor={`sal${index}`}
                    className="flex gap-2 text-sm capitalize"
                    key={index}
                  >
                    <input
                      type="radio"
                      name="sallary"
                      id={`sal${index}`}
                      value={value}
                      checked={value == sallaryChoice}
                      onChange={(e) => {
                        setSallaryChoice(e.target.value); // Update the state when a radio button is selected
                      }}
                    />
                    {value}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 ">
            {sallaryChoice == "Range" ? (
              <div className="flex w-full col-span-2 gap-5">
                <div className="w-full">
                  <h2>Min. Sallary</h2>
                  <div className="flex">
                    <input
                      type="number"
                      name="min_sallary"
                      id="min_sallary"
                      className="border outline-none p-3 w-full h-10  bg-zinc-100"
                      placeholder="Enter minimum Sallary here ..."
                      onChange={(e) => setMinSallary(e.target.value)}
                      value={minSallary}
                    />
                    <select
                      name="currency_choice"
                      id="currency_choice"
                      className="outline-none w-1/6 py-1 border text-center  bg-gray-300 rounded-tr-md rounded-br-md"
                      onChange={(e) => setCurrency(e.target.value)}
                      value={currency}
                    >
                      {currencyChoice.map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <h2>Max. Sallary</h2>
                  <div className="flex">
                    <input
                      type="number"
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
                      value={currency}
                      readOnly
                      className="border outline-none text-center w-10 bg-gray-300 rounded-tr-md rounded-br-md"
                    />
                  </div>
                </div>
              </div>
            ) : sallaryChoice == "fixed" ? (
              <div className="flex">
                <input
                  type="number"
                  name="fixed_sallary"
                  id="fixed_sallary"
                  className="border outline-none p-3 w-full h-10  bg-zinc-100"
                  placeholder="Enter Sallary here ..."
                  onChange={(e) => setFixedSallary(e.target.value)}
                  value={fixedSallary}
                />
                <select
                  name="currency_choice"
                  id="currency_choice"
                  className="outline-none w-1/6 py-1 border text-center h-10  bg-gray-300 rounded-tr-md rounded-br-md"
                  onChange={(e) => setCurrency(e.target.value)}
                  value={currency}
                >
                  {currencyChoice.map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div
                class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <p className="font-bold">Information :</p>
                <span class="font-medium">
                  sallary will be open for negotiation!
                </span>
              </div>
            )}

            <div className="">
              <h2 className="w-fit">Sallary Type</h2>
              <select
                name="salary_type"
                id="salary_type"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setSalaryType(e.target.value)}
                value={salaryType}
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
        <div className="border border-black p-5 rounded-md">
          <h2 className="mb-3 font-bold">Advanced Information</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <h2>Education</h2>
              <select
                name="education"
                id="education"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setEducation(e.target.value)}
                value={education}
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
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <h2>Job Type</h2>
              <select
                name="job_type"
                id="job_type"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setJobType(e.target.value)}
                value={jobType}
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
                value={vacancies}
              />
            </div>
            <div>
              <h2>Dead Line</h2>
              <input
                type="date"
                name="deadline"
                id="deadline"
                className="border outline-none p-3 w-full h-10"
                defaultValue={deadline}
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
                value={jobLevel}
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
            <div className="w-full">
              <h2>Job Category</h2>
              <select
                name="job_category"
                id="job_category"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setJobCategory(e.target.value)}
                value={jobCategory}
              >
                {jobCategoryList.map((value, index) => {
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
        <div className="border border-black p-5 rounded-md">
          <h2 className="mb-2 font-bold">Location</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h2>Region</h2>
              <select
                name="job_level"
                id="job_level"
                className="border py-2 px-5 w-full outline-none"
                onChange={(e) => setRegion(e.target.value)}
                value={region}
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
                value={additionalAddress}
              />
            </div>
          </div>
        </div>
        <div className="border border-black rounded-md p-5 space-y-4">
          <p className="font-bold">Requirements</p>
          <div className="flex flex-col gap-2">
            <h2>Required Skill</h2>
            <div className="flex flex-col gap-2">
              {requiredSkill.map((skill, index) => (
                <div>
                  <p className="text-sm text-slate-500">skill {index + 1}</p>
                  <div key={index} className="flex">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        updateSkillRequirement(index, e.target.value)
                      }
                      className="outline-none border w-full h-10 px-2"
                      placeholder="Enter Job benefits here ..."
                    />

                    <button
                      type="button"
                      onClick={(e) => removeSkillRequirement(e, index)}
                      className="w-10 border bg-blue-gray-100"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
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
              {responsibility.map((resp, index) => (
                <div>
                  <p className="text-sm text-slate-500">
                    Responsiblity {index + 1}
                  </p>
                  <div key={index} className="flex">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) =>
                        updateResponsibility(index, e.target.value)
                      }
                      className="outline-none border w-full h-10 px-2"
                      placeholder="Enter Job benefits here ..."
                    />

                    <button
                      onClick={(e) => removeResponsibility(e,index)}
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
        </div>

        <div className="border border-black p-5 rounded-md flex flex-col gap-3">
          <p className="font-bold">Additional Information</p>
          <div className="flex flex-col gap-2">
            <h2>Job Benefit</h2>
            <div className="flex flex-col gap-2">
              {jobBenefits.map((benefit, index) => (
                <div>
                  <p className="text-sm text-slate-500">benefit {index + 1}</p>
                  <div key={index} className="flex">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateJobBenefit(index, e.target.value)}
                      className="outline-none border w-full h-10 px-2"
                      placeholder="Enter Job benefits here ..."
                    />

                    <button
                      onClick={(e) => removeBenefit(e,index)}
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
              value={jobDescription}
            ></textarea>
            <p
              className={`${
                countVision == 0 ? "text-red-500" : "text-black"
              } flex justify-end`}
            >
              {countVision > 0 ? countVision : "Not more than 500 characters"}
            </p>
          </div>
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
export default UpdateJob;
