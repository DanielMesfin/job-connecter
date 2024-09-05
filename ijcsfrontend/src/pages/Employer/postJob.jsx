import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  Input,
  Select,
  Option,
  Radio,
  Textarea,
} from "@material-tailwind/react";
import { CiSquareRemove } from "react-icons/ci";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

const PostJob = (props) => {
  const sallaryTypeList = ["Monthly", "Fixed", "Per Task", "Hourly"];
  const educationList = ["BSC", "BA"];
  const jobTypeList = ["Permanent", "Contract", "per hour"];
  const jobCategoryList = ["On-site", "Remote", "hybrid"];
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
  const sallaryChoices = ["Range", "fixed", "on-agreement"];
  const currencyChoice = ["Birr", "USD"];

  const { user, profile_full } = useUserContext();
  const [CustomErrors, setErrors] = useState({});

  const validationSchema = yup
    .object({
      job_title: yup.string().required("Job title is required"),
      tags: yup.string().required("Tags are required"),
      job_role: yup.string().required("Job role is required"),

      minSalary: yup.number().when("salaryChoice", {
        is: "Range",
        then: yup.number().required("Minimum salary is required"),
      }),
      maxSalary: yup.number().when("salaryChoice", {
        is: "Range",
        then: yup
          .number()
          .required("Maximum salary is required")
          .moreThan(
            yup.ref("minSalary"),
            "Maximum salary must be greater than minimum salary"
          ),
      }),
      fixedSalary: yup.number().when("salaryChoice", {
        is: "fixed",
        then: yup.number().required("Fixed salary is required"),
      }),

      sallary_type: yup.string().required("Salary type is required"),
      educations: yup.string().required("Education is required"),
      experience: yup.string().required("Experience is required"),
      job_type: yup.string().required("Job type is required"),
      vacancie: yup.string().required("Vacancy is required"),
      deadline: yup.string().required("Deadline is required"),
      job_level: yup.string().required("Job level is required"),
      job_category: yup.string().required("Job category is required"),
      region1: yup.string().required("Region is required"),
      required_skill: yup
        .array()
        .of(yup.string().required("Required Skill is required")),
      resp: yup.array().of(yup.string().required("Responsibilty is required")),
      job_benefit: yup
        .array()
        .of(yup.string().required("Job benefit is required")),
      job_descriptioni: yup.string().required("Job description is required"),
    })
    .required();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      job_title: "",
      tags: "",
      job_role: "",
      minSalary: 0,
      maxSalary: 0,
      fixedSalary: 0,

      // sallary: "",
      sallary_type: "",
      educations: "",
      experience: "",
      job_type: "",
      vacancie: "",
      job_level: "",
      job_category: "",
      region1: "",
      additional_address: "",
      required_skill: [],
      resp: [],
      job_benefit: [],
      job_descriptioni: "",
    },
  });

  const job_title = watch("job_title");
  const tags = watch("tags");
  const job_role = watch("job_role");
  const minSalary = watch("minSalary");
  const maxSalary = watch("maxSalary");
  const fixedSalary = watch("fixedSalary");
  // const sallary = watch("sallary");
  const sallary_type = watch("sallary_type");
  const educations = watch("educations");
  const experience = watch("experience");
  const job_type = watch("job_type");
  const vacancie = watch("vacancie");
  const deadline1 = watch("deadline");
  const job_level = watch("job_level");
  const job_category = watch("job_category");
  const region1 = watch("region1");
  const additional_address = watch("additional_address");
  const required_skill = watch("required_skill");
  const resp = watch("resp");
  const job_benefit = watch("job_benefit");
  const job_descriptioni = watch("job_descriptioni");

  const [countVision, setCountVision] = useState(500);
  const [jobTitle, setJobTitle] = useState("");
  const [jobTag, setJobTag] = useState("");
  const [sallaryType, setSallaryType] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 0 });

  const [minSallary, setMinSallary] = useState();
  const [maxSallary, setMaxSallary] = useState();
  const [fixedSallary, setFixedSallary] = useState();
  const [sallaryError, setSallaryError] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [salaryType, setSalaryType] = useState("");

  const [sallaryChoice, setSallaryChoice] = useState(sallaryChoices[0]);
  const [currency, setCurrency] = useState("");

  const [education, setEducation] = useState("");
  // const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [vacancies, setVacancies] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [location, setLocation] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState();

  const [responsibility, setResponsibility] = useState([""]);
  const [requiredSkill, setRequiredSkill] = useState([""]);

  const [jobBenefits, setJobBenefits] = useState([""]);
  const [jobDescription, setJobDescription] = useState("");
  const [jobRole, setJobRole] = useState();
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState({ region: "", additionalAddress: "" });

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

  const updateSkillRequirement = (index, updatedSkill) => {
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

  const updateResponsibility = (index, updatedResponsibility) => {
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

  const updateJobBenefit = (index, updatedBenefit) => {
    setJobBenefits(
      jobBenefits.map((benefit, i) => (i === index ? updatedBenefit : benefit))
    );
  };

  const removeBenefit = (e, index) => {
    e.preventDefault();
    setJobBenefits(jobBenefits.filter((_, i) => i !== index));
  };

  // const handleSelections = () => {
  //   if (sallaryType == "") {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       sallary_type: { message: "Sallary type is required" },
  //     }));
  //   }
  //   if (education == "") {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       education: { message: "Education  is required" },
  //     }));
  //   }
  //   if (jobType == "") {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       job_type: { message: "Job type is required" },
  //     }));
  //   }
  //   if (jobLevel == "") {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       job_level: { message: "Job Level is required" },
  //     }));
  //   }
  //   if (jobCategory == "") {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       job_category: { message: "Job Category is required" },
  //     }));
  //   }
  //   if (region == "") {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       region: { message: "Region is required" },
  //     }));
  //   }
  //   return customErrors;
  // };

  async function PostJob(data) {
    console.log("from post job",data);

    setSalaryRange({ min: minSallary, max: maxSallary });
    setAddress({ region: region, additionalAddress: additionalAddress });
    console.log({
      job_title,
      tags,
      job_role,
      experience,
      deadline1,
      region1,
      job_descriptioni,
      // sallary,
      sallary_type,
      educations,
      job_type,
      vacancie,
      job_level,
      job_category,
      additional_address,
      required_skill,
      resp,
      job_benefit,
    });

    let date = new Date();
    let formattedDate = date.toISOString().split("T")[0];

    let formData = new FormData();
    formData.append("title", job_title);
    formData.append("post_date", formattedDate); //Post Date
    formData.append("tag", JSON.stringify(tags.split(","))); //Tag
    formData.append("education", educations);
    formData.append("job_level", job_level);
    formData.append("job_role", job_role);
    formData.append("vacancies", vacancie);
    formData.append("job_type", job_type);
    formData.append("job_category", job_category);
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
    formData.append("deadline", deadline1);

    formData.append(
      "location",
      JSON.stringify({ region: region1, additional: additional_address })
    );
    formData.append("job_benefits", JSON.stringify(job_benefit));
    formData.append("job_description", job_descriptioni);
    formData.append("responsiblity", JSON.stringify(resp));
    formData.append("required_skill", JSON.stringify(required_skill));

    await axios
      .post(`http://127.0.0.1:8000/job/post/${props.id}/`, formData, {
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
        console.info(err);
      });
  }

  const PrintData = (e, data) => {
    e.preventDefault();
    console.log("data : ", data);
    console.log({
      job_title,
      tags,
      job_role,
      experience,
      deadline1,
      region1,
      job_descriptioni,
      sallary,
      sallary_type,
      educations,
      job_type,
      vacancie,
      job_level,
      job_category,
      additional_address,
      required_skill,
      resp,
      job_benefit,
    });
  };

  return (
    <div>
      {errorMessage && (
        <div
          className="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span>
          {errorMessage}
        </div>
      )}
      {message && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Success alert!</span> {message}
        </div>
      )}
      <form
        className="space-y-5 py-5 "
        onSubmit={handleSubmit(PostJob)}
        noValidate
      >
        {/* (e) => post_job(e) */}
        <h1 className="mb-5 text-xl font-semibold">Post a Job</h1>
        <div className="border border-black p-5 rounded-md flex flex-col gap-3">
          <p className="font-bold">Basic Information</p>
          <div className="space-y-5">
            <div>
              <label htmlFor="job_title">Job Title</label>

              <Input
                {...register("job_title")}
                size="lg"
                label="Job Title"
                type="text"
                name="job_title"
                id="job_title"
                placeholder="Enter Job Title here ..."
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                // onChange={(e) => setJobTitle(e.target.value)}
              />
              {errors.job_title && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.job_title.message}
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <h2>Tags</h2>
                <Input
                  size="lg"
                  label="Tags"
                  type="text"
                  name="tags"
                  id="tags"
                  {...register("tags")}
                  placeholder="Enter Job tag here ..."
                  className="border outline-none p-3 w-full h-10  bg-zinc-100"
                  // onChange={(e) => setJobTag(e.target.value)}
                />
                {errors.tags && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors.tags.message}
                  </span>
                )}
                <br />
                <span className="text-xs text-gray-700">
                  Use comma to separate tags. <strong>eg. tag1,tag2 ...</strong>
                </span>
              </div>
              <div>
                <h2>Job Role</h2>
                <Input
                  size="lg"
                  label="Job Role"
                  type="text"
                  name="job_role"
                  {...register("job_role")}
                  id="tags"
                  placeholder="Enter Job Role here ..."
                  className="border outline-none p-3 w-full h-10  bg-zinc-100"
                  // onChange={(e) => setJobRole(e.target.value)}
                />
                {errors.job_role && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors.job_role.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border border-black p-5 rounded-md">
          <div className="gap-3">
            <h2 className="font-bold">Sallary</h2>
            <div className="flex justify-center items-center gap-3 border w-fit p-3 rounded-md border-gray-400">
              {sallaryChoices.map((value, index) => {
                return (
                  // <label
                  //   htmlFor={`sal${index}`}
                  //   className="flex gap-2 text-sm capitalize"
                  //   key={index}
                  // >
                  <Radio
                    type="radio"
                    label={value}
                    name="sallary"
                    id={`sal${index}`}
                    value={value}
                    defaultChecked={value === sallaryChoice} // Set defaultChecked based on the selected value
                    onChange={(e) => {
                      setSallaryChoice(e.target.value); // Update the state when a radio button is selected
                    }}
                  />
                  // {value}
                  // </label>
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
                    <Input
                      size="lg"
                      label="Minimum Sallary"
                      type="number"
                      name="min_sallary"
                      id="min_sallary"
                      className="border outline-none    bg-zinc-100"
                      placeholder="Enter minimum Sallary here ..."
                      onChange={(e) => setMinSallary(e.target.value)}
                      icon={
                        <select
                          size="lg"
                          label="Currency"
                          name="currency_choice"
                          id="currency_choice"
                          className="outline-none -my-3 py-2.5 -ml-11 border rounded-md   text-center w-20 bg-gray-300 cursor-pointer"
                          // onChange={(e) => setCurrency(e.target.value)}
                        >
                          {currencyChoice.map((value, index) => {
                            return (
                              <option key={index} value={value} className="">
                                {value}
                              </option>
                            );
                          })}
                        </select>
                      }
                    />
                  </div>
                  {errors.minSalary && (
                    <span
                      className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {errors.minSalary.message}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <h2>Max. Sallary</h2>
                  <div className="flex">
                    <Input
                      size="lg"
                      label="Maximum Sallary"
                      type="number"
                      name="max_sallary"
                      id="max_sallary"
                      className="border outline-none p-3 w-full h-10  bg-zinc-100"
                      placeholder="Enter maximum Sallary here ..."
                      onChange={(e) => {
                        const newMaxSalary = e.target.value;
                        if (newMaxSalary < minSallary) {
                          setSallaryError(
                            "Max salary can't be less than min salary"
                          );
                        } else if (newMaxSalary === minSallary) {
                          setSallaryError(
                            "Max salary can't be equal to min salary"
                          );
                        } else {
                          setMaxSallary(newMaxSalary);
                          setSallaryError("");
                        }
                      }}
                      icon={
                        <input
                          type="text"
                          name="currency"
                          id="currency"
                          value={currency}
                          readOnly
                          className="border outline-none  text-center w-20 -ml-11   rounded-md -my-2.5 py-2  bg-gray-300 rounded-tr-md rounded-br-md"
                        />
                      }
                    />
                  </div>
                  {sallaryError && (
                    <span
                      className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {sallaryError}
                    </span>
                  )}
                </div>
              </div>
            ) : sallaryChoice == "fixed" ? (
              <div>
                <h2 className="w-fit">Sallary</h2>
                <div className="flex">
                  <Input
                    size="lg"
                    label="Fixed Sallary"
                    {...register("fixedSalary")}
                    type="number"
                    name="fixed_sallary"
                    id="fixed_sallary"
                    className="border outline-none p-3 w-full h-10  bg-zinc-100"
                    placeholder="Enter Sallary here ..."
                    // onChange={(e) => setFixedSallary(e.target.value)}
                    value={fixedSallary}
                    icon={
                      <select
                        size="lg"
                        label="Currency"
                        name="currency_choice"
                        id="currency_choice"
                        className="outline-none -my-3 py-2.5 -ml-11 border rounded-md   text-center w-20 bg-gray-300 cursor-pointer"
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        {currencyChoice.map((value, index) => {
                          return (
                            <option
                              key={index}
                              value={value}
                              className=""
                              defaultChecked={value === currency}
                            >
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    }
                  />
                </div>
              </div>
            ) : (
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <p className="font-bold">Information :</p>
                <span className="font-medium">
                  sallary will be open for negotiation!
                </span>{" "}
                {message}
              </div>
            )}

            <div className="">
              <h2 className="w-fit">Sallary Type</h2>
              <select
                size="lg"
                label="Sallary Type"
                {...register("sallary_type")}
                name="sallary_type"
                id="sallary_type"
                className="border h-[2.7rem] border-gray-400 px-5 w-full outline-none rounded-md text-gray-700"
              >
                {" "}
                <option className="h-12 w-1/2" value={""} disabled>
                  Select Sallary Type
                </option>
                {sallaryTypeList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.sallary_type && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.sallary_type.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="border border-black p-5 rounded-md">
          <h2 className="mb-3 font-bold">Advanced Information</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <h2>Education</h2>
              <select
                size="lg"
                {...register("educations")}
                label="Education"
                name="educations"
                id="education"
                className="border h-[2.7rem] border-gray-400 px-5 w-full outline-none rounded-md text-gray-700"
              >
                <option className="h-12 w-1/2" value={""} disabled>
                  Select Education
                </option>
                {educationList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.educations && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.educations.message}
                </span>
              )}
            </div>
            <div>
              <h2>Experience</h2>
              <Input
                size="lg"
                label="Years of Experience"
                type="number"
                {...register("experience")}
                name="experience"
                id="experience"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                placeholder="Enter Experience here ..."
              />
              {errors.experience && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.experience.message}
                </span>
              )}
            </div>
            <div>
              <h2>Job Type</h2>
              <select
                size="lg"
                label="Job Type"
                name="job_type"
                {...register("job_type")}
                id="job_type"
                className="border h-[2.7rem] border-gray-400 px-5 w-full outline-none rounded-md text-gray-700"
              >
                {" "}
                <option className="h-12 w-1/2" value={""} disabled>
                  Select Job Type
                </option>
                {jobTypeList.map((value, index) => {
                  return (
                    <option
                      key={index}
                      value={value}
                      defaultChecked={value === jobType}
                      className="h-12 w-1/2"
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.job_type && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.job_type.message}
                </span>
              )}
            </div>
            <div>
              <h2>Vacancies</h2>
              <Input
                size="lg"
                label="Vacancies"
                type="text"
                {...register("vacancie")}
                name="vacancie"
                id="vacancies"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                placeholder="Enter number of positions ..."
                // onChange={(e) => setVacancies(e.target.value)}
              />
              {errors.vacancie && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.vacancie.message}
                </span>
              )}
            </div>
            <div>
              <h2>Dead Line</h2>
              <input
                type="date"
                name="deadline"
                {...register("deadline")}
                id="deadline"
                className="border outline-none p-3 w-full h-11 rounded-md border-gray-400 focus:border-black focus:border-2 cursor-pointer"
                // onChange={(e) => setDeadline(e.target.value)}
              />
              {errors.deadline && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.deadline.message}
                </span>
              )}
            </div>
            <div>
              <h2>Job Level</h2>
              <select
                size="lg"
                label="Job Level"
                {...register("job_level")}
                name="job_level"
                id="job_level"
                className="border h-[2.7rem] border-gray-400 px-5 w-full outline-none rounded-md text-gray-700"
              >
                <option className="h-12 w-1/2" value={""} disabled>
                  Select Job Level
                </option>
                {jobLevelList.map((value, index) => {
                  return (
                    <option
                      key={index}
                      value={value}
                      defaultChecked={value === jobLevel}
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.job_level && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.job_level.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <h2>Job Category</h2>
              <select
                size="lg"
                label="Job Category"
                {...register("job_category")}
                name="job_category"
                id="job_category"
                className="border h-[2.7rem] border-gray-400 px-5 w-full outline-none rounded-md text-gray-700"
              >
                {" "}
                <option className="h-12 w-1/2" value={""} disabled>
                  Select Job Category
                </option>
                {jobCategoryList.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.job_category && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.job_category.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="border border-black p-5 rounded-md">
          <h2 className="mb-2 font-bold">Location</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h2>Region</h2>
              <select
                size="lg"
                label="Region"
                name="region"
                {...register("region1")}
                id="region"
                className="border h-[2.7rem] border-gray-400 px-5 w-full outline-none rounded-md text-gray-700"

                // onChange={(e) => setRegion(e.target.value)}
                // value={region}
              >
                {" "}
                <option className="h-12 w-1/2" value={""} disabled>
                  Select Region
                </option>
                {regionslist.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.region1 && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.region1.message}
                </span>
              )}
            </div>
            <div>
              <h2>Additional Address</h2>
              <Input
                size="lg"
                label="Additional Address (optional)"
                type="text"
                {...register("additional_address")}
                name="additional_address_info"
                id="additional_address_info"
                className="border outline-none p-3 w-full h-10  bg-zinc-100"
                onChange={(e) => setAdditionalAddress(e.target.value)}
              />
              {errors.additional_address && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.additional_address.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="border border-black rounded-md p-5 space-y-4">
          <p className="font-bold">Requirements</p>
          <div className="flex flex-col gap-2">
            <h2>Required Skill</h2>
            <div className="flex flex-col gap-2">
              {requiredSkill.map((link, index) => (
                <div>
                  <div>
                    <div key={index} className="flex">
                      <Input
                        size="lg"
                        label={`Skill ${index + 1}`}
                        {...register(`required_skill.${index}`, {
                          required: "Required Skill is required",
                        })}
                        type="text"
                        value={link.url}
                        // onChange={(e) =>
                        //   setTimeout(() => {

                        //     updateSkillRequirement(index, e.target.value);
                        //   })
                        // }
                        className="outline-none border w-full h-10 px-2"
                        placeholder="Enter Job benefits here ..."
                        icon={
                          <CiSquareRemove
                            onClick={(e) => removeSkillRequirement(e, index)}
                            className="text-red-500 cursor-pointer"
                            size={25}
                          />
                        }
                      />
                    </div>
                    {errors.required_skill && errors.required_skill[index] && (
                      <span
                        className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {errors.required_skill[index].message}
                      </span>
                    )}

                    {/* <button
                     
                      className="w-10 border bg-blue-gray-100"
                    >
                     
                    </button> */}
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
                  <div>
                    <div key={index} className="flex">
                      <Input
                        size="lg"
                        label={`Responsiblity ${index + 1}`}
                        {...register(`resp.${index}`, {
                          required: "Resposibility is required",
                        })}
                        type="text"
                        value={link.url}
                        // onChange={(e) =>
                        //   setTimeout(() => {
                        //     setError("resp", null);
                        //     updateResponsibility(index, e.target.value);
                        //   }, 0)
                        // }
                        className="outline-none border w-full h-10 px-2"
                        placeholder="Enter Job benefits here ..."
                        icon={
                          <CiSquareRemove
                            onClick={(e) => removeResponsibility(e, index)}
                            className="text-red-500 cursor-pointer"
                            size={25}
                          />
                        }
                      />
                    </div>
                    {errors.resp && errors.resp[index] && (
                      <span
                        className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {errors.resp[index].message}
                      </span>
                    )}
                    {/* <button
                      onClick={(e) => removeResponsibility(e, index)}
                      className="w-10 border bg-blue-gray-100"
                    >
                      x
                    </button> */}
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
            <div className="flex flex-col gap-2">
              <h2>Job Benefit</h2>
              <div className="flex flex-col gap-2">
                {jobBenefits.map((link, index) => (
                  <div>
                    <div key={index} className="flex">
                      <Input
                        size="lg"
                        label={`Benefit ${index + 1}`}
                        {...register(`job_benefit.${index}`, {
                          required: "Job benefit is required",
                        })}
                        type="text"
                        value={link.url}
                        // onChange={(e) =>
                        //   setTimeout(() => {
                        //     setError(`job_benefit`, null);
                        //     updateJobBenefit(index, e.target.value);
                        //   }, 0)
                        // }
                        className="outline-none border w-full h-10 px-2"
                        placeholder="Enter Job benefits here ..."
                        icon={
                          <CiSquareRemove
                            onClick={(e) => removeBenefit(e, index)}
                            className="text-red-500 cursor-pointer"
                            size={25}
                          />
                        }
                      />
                    </div>
                    {errors.job_benefit && errors.job_benefit[index] && (
                      <span
                        className="text-red-800 rounded-lg text-xs dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {errors.job_benefit[index].message}
                      </span>
                    )}
                  </div>
                ))}
                <button
                  onClick={addJobBenefit}
                  className="border py-2 bg-blue-gray-100"
                >
                  Add Benefit
                </button>
              </div>
            </div>{" "}
          </div>

          <div className="space-y-2">
            <h2>Job Description</h2>

            <div className="relative w-full min-w-[200px]">
              <Textarea
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setCountVision(500 - e.target.value.length);
                }}
                name="job_description"
                {...register("job_descriptioni")}
                id="job_description"
                cols="30"
                rows="8"
                label="Add your job description"
                maxLength={500}
                className="peer  min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              ></Textarea>
              {errors.job_descriptioni && (
                <span
                  className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {errors.job_descriptioni.message}
                </span>
              )}
            </div>
            <p
              className={`${
                countVision == 0 ? "text-red-500" : "text-black"
              } flex justify-end`}
            >
              {countVision > 0 ? countVision : "Not more than 500 characters"}
            </p>
          </div>
        </div>
        <div className={`flex gap-5 cursor-pointer `}>
          {
            <button
              type="submit"
              data-tooltip-id={`${
                profile_full ? "post_job" : "complete_profile"
              }`}
              disabled={!profile_full}
              className={`bg-blue-500 py-3 px-10 text-white rounded-md   `}
            >
              Post Job
            </button>
          }
        </div>
      </form>
      <ReactTooltip
        id="post_job"
        place="bottom"
        content="Post Job"
        variant="info"
      />
      <ReactTooltip
        id="complete_profile"
        place="bottom"
        content="Complete You Profile Data"
        variant="error"
      />
    </div>
  );
};
export default PostJob;
