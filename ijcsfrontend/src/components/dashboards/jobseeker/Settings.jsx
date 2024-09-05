import React, { useState, useRef, useEffect } from "react";
// import { jsPDF } from "jspdf";
import jsPDF from "jspdf";
// import { renderToStaticMarkup } from 'react-dom/server';
import axios from "axios";
import { useLocation } from "react-router-dom";

import { GoPerson } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { PiGlobeSimpleLight } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { LuUploadCloud } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { GiRollingEnergy } from "react-icons/gi";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  // Started Here for Draggble and Uploadable part of Profile Picture
  const [isDragging, setIsDragging] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    // Handle dropped files here
    const files = e.dataTransfer.files;
    // Assuming only one file is dropped
    const file = files[0];
    // Chages made start here
    setImageFile(file);
    setProfilePicture(file);
    const reader = new FileReader();
    reader.onload = function (event) {
      setImagePath(event.target.result);
    };
    reader.readAsDataURL(file);
    // Chages made End here
  };
  const handleFileInputChange = (e) => {
    // Handle selected file(s) here
    const files = e.target.files;
    // Assuming only one file is selected
    const file = files[0];
    // Change made start here
    setImageFile(file);
    setProfilePicture(file);
    const reader = new FileReader();
    reader.onload = function (event) {
      setImagePath(event.target.result);
    };
    reader.readAsDataURL(file);
    // Change made End here
  };
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePath("");
  };
  const handleContainerClick = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };
  // End Here for Draggble and Uploadable part of Profile Picture

  // Update Functions
  const autedUserData =
    useLocation()?.state?.data || JSON.parse(localStorage.getItem("user"));
  console.log("This is auted user data", autedUserData);
  const [authedJobSeekerData, setAuthedJobSeekerData] = useState(null);
  const [profile_picture, setProfilePicture] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [username, setUserName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const [socialMediaLink, setSocialMediaLink] = useState([
    { key: "", value: "" },
  ]);
  const [educations, setEducations] = useState([{ key: "", field: "" }]);
  const [skills, setSkills] = useState([]);

  //Adding Social Media Links Logic Start Here
  const handleSocialMediaChange = (index, e) => {
    const { name, value } = e.target;
    setSocialMediaLink((prevSocialMedia) => {
      const updatedSocialMedia = [...prevSocialMedia];
      if (name === "key") {
        updatedSocialMedia[index] = {
          ...updatedSocialMedia[index],
          [name]: value,
        };
      } else {
        updatedSocialMedia[index] = {
          ...updatedSocialMedia[index],
          value,
        };
      }
      return updatedSocialMedia;
    });
  };
  const handleAddSocialMedia = () => {
    setSocialMediaLink((prevSocialMedia) => [
      ...prevSocialMedia,
      { key: "", value: "" },
    ]);
  };
  const handleRemoveSocialMedia = (index) => {
    setSocialMediaLink((prevSocialMedia) =>
      prevSocialMedia.filter((_, i) => i !== index)
    );
  };
  //Adding Social Media Links Logic Ended Here

  // Updating Logic For Education Started Here
  const handleAddEducation = () => {
    const newEducation = {
      key: "",
      field: "",
    };
    setEducations([...educations, newEducation]);
  };

  const handleKeyChange = (event, index) => {
    const updatedEducations = [...educations];
    updatedEducations[index].key = event.target.value;
    setEducations(updatedEducations);
  };

  const handleFieldChange = (event, index) => {
    const updatedEducations = [...educations];
    updatedEducations[index].field = event.target.value;
    setEducations(updatedEducations);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };
  // Updating Logic For Educations End Here

  // Updating Logic For Skills Started Here
  const handleAddSkill = () => {
    if (!Array.isArray(skills)) {
      setSkills([]);
    }
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
  // Updating Logic For Skills Ended Here

  const loadJobSeeker = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/candidate/all/${autedUserData.id}/`
      );

      setAuthedJobSeekerData(data);

      setProfilePicture(data.profile_picture);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setNationality(data.nationality);
      setExperience(data.experience);
      setPortfolio(data.portfolio);
      setUserName(data.username);
      setBirthDate(data.birth_date);
      setLocation(data.location);
      setBio(data.bio);
      setGender(data.gender);
      setSocialMediaLink(data.socialMediaLink || []);
      setEducations(data.educations);
      setSkills(data.skills);
    } catch (error) {
      const popupContainer = document.createElement("div");
      popupContainer.className =
        "fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-[1000]";

      const popup = document.createElement("div");
      popup.className =
        "bg-white text-center py-9 px-6 w-[40%] rounded shadow-lg";

      const message = document.createElement("p");
      message.textContent = `Data Loading Error Of: ${error.message}`;
      message.className = "text-lg text-gray-800 mb-4";
      popup.appendChild(message);

      const okButton = document.createElement("button");
      okButton.textContent = "OK";
      okButton.className =
        "text-sm text-blue-500 focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
      okButton.addEventListener("click", () => {
        document.body.removeChild(popupContainer);
      });
      popup.appendChild(okButton);

      popupContainer.appendChild(popup);
      document.body.appendChild(popupContainer);
    }
  };

  if (!Array.isArray(educations)) {
    // If educations is not an array, initialize it as an empty array
    setEducations([]);
  }
  useEffect(() => {
    loadJobSeeker();
  }, []);
  const handleUpdate = async () => {
    try {
      let formFieldData = new FormData();

      formFieldData.append("first_name", first_name);
      formFieldData.append("username", username);
      formFieldData.append("last_name", last_name);
      formFieldData.append("profile_picture", profile_picture);
      formFieldData.append("nationality", nationality);
      formFieldData.append("experience", experience);
      formFieldData.append("gender", gender);
      formFieldData.append("portfolio", portfolio);
      formFieldData.append("bio", bio);
      formFieldData.append("birth_date", birth_date);
      formFieldData.append("location", location);
      formFieldData.append("socialMediaLink", JSON.stringify(socialMediaLink));
      formFieldData.append("educations", JSON.stringify(educations));
      formFieldData.append("skills", skills);
      formFieldData.append("gender", gender);
      console.log(formFieldData);

      await axios({
        method: "PATCH",
        url: `http://localhost:8000/candidate/update/${autedUserData.id}/`,
        data: formFieldData,
      }).then(() => {
        // alert("Update Successful!");
        const popupContainer = document.createElement("div");
        popupContainer.className =
          "fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-[1000]";

        const popup = document.createElement("div");
        popup.className =
          "bg-white text-center py-9 px-6 w-[40%] rounded shadow-lg";

        const message = document.createElement("p");
        message.textContent = "Update Successful!";
        message.className = "text-lg text-gray-800 mb-4";
        popup.appendChild(message);

        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.className =
          "text-sm text-blue-500 focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
        okButton.addEventListener("click", () => {
          document.body.removeChild(popupContainer);
        });
        popup.appendChild(okButton);

        popupContainer.appendChild(popup);
        document.body.appendChild(popupContainer);
      });
    } catch (error) {
      alert(`Oops! An Error Occurred While Updating: ${error.message}`);
    }
  };

  if (authedJobSeekerData === null) {
    return <div>Loading....</div>;
  }
  const handleGenerateCV = () => {
    if (!authedJobSeekerData) {
      console.error("Authed Job Seeker Data is not available.");
      return;
    }

    const doc = new jsPDF();

    const profileImageUrl = authedJobSeekerData.profile_picture;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = profileImageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = canvas.toDataURL("image/jpeg", 1.0);

      // Add profile image to the PDF
      doc.addImage(imageData, "JPEG", 155, 10, 45, 40);

      // Add styled text content to the first page
      doc.setFont("helvetica", "light");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(25);
      doc.text(authedJobSeekerData.first_name.toUpperCase(), 10, 20);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(25);
      doc.text(authedJobSeekerData.last_name.toUpperCase(), 55, 20);

      const educations = authedJobSeekerData.educations;
      if (educations && educations.length > 0) {
        const educationText1 = educations
          .map((education) => {
            const { field, key } = education;
            if (key.toLowerCase() == "main" || " ") {
              return `${field}`;
            } else {
              return;
            }
          })
          .join("\n");

        doc.setFontSize(14);
        doc.setTextColor(150, 150, 150);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);

        doc.text(educationText1.toUpperCase(), 10, 30);

        // Get the width of the text
        const textWidth = doc.getTextWidth(educationText1.toUpperCase());

        // Add line
        const lineWidth = 15; // Width of the line
        const lineX = textWidth + 13; // X position of the line
        const lineY = 29; // Y position of the line

        doc.setLineWidth(0.5); // Set line width
        doc.setDrawColor(255, 165, 0); // Set line color
        doc.line(lineX, lineY, lineX + lineWidth, lineY); // Draw the line
      }

      // Set the text color
      doc.setTextColor(150, 150, 150); // Red color (RGB: 255, 0, 0)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Email Me:${authedJobSeekerData.email}`, 130, 60);
      //Profile Text Heading
      doc.setTextColor(0, 0, 0); // Red color (RGB: 255, 0, 0)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text("PROFILE", 80, 100);

      const text = authedJobSeekerData.bio;
      const maxLineWidth = 120; // Maximum line width
      const lineHeight = 3; // Line height
      const verticalGap = 3; // Vertical gap between lines
      const startX = 85; // X position to start the text
      let startY = 108; // Y position to start the text

      doc.setTextColor(150, 150, 150); // Set text color to gray
      doc.setFont("helvetica", "normal"); // Set font
      doc.setFontSize(12); // Set font size

      const lines = doc.splitTextToSize(text, maxLineWidth); // Split text into lines
      lines.forEach((line) => {
        doc.text(line, startX, startY); // Output each line of text
        startY += lineHeight + verticalGap; // Adjust Y position for the next line
      });

      // Properties for the second line
      const lineX2 = 10; // X position of the second line
      const lineY2 = 72; // Y position of the second line
      const lineWidth2 = doc.internal.pageSize.getWidth() - 20; // Width of the second line
      const lineColor2 = [160, 160, 160]; // Gray color (RGB: 128, 128, 128)

      // Draw the second line
      doc.setLineWidth(0.2); // Set line width
      doc.setDrawColor(lineColor2[0], lineColor2[1], lineColor2[2]); // Set line color
      doc.line(lineX2, lineY2, lineX2 + lineWidth2, lineY2); // Draw the line

      // Properties for the vertical line
      const lineX3 = 70; // X position of the vertical line
      const lineY3 = 72; // Y position of the vertical line
      const lineHeight3 = doc.internal.pageSize.getHeight() - 72; // Height of the vertical line
      const lineColor3 = [150, 150, 150]; // Blue color (RGB: 0, 0, 255)

      // Draw the vertical line
      doc.setLineWidth(0.2); // Set line width
      doc.setDrawColor(lineColor3[0], lineColor3[1], lineColor3[2]); // Set line color
      doc.line(lineX3, lineY3, lineX3, lineY3 + lineHeight3); // Draw the line
      // Educations
      // const educations = authedJobSeekerData.educations;
      if (educations && educations.length > 0) {
        const lineHeight = 3; // Adjust the line height as needed
        let startY = 105; // Starting Y-coordinate for the education entries

        educations.forEach((education) => {
          const { field, key } = education;
          const fields = field.split(", "); // Split the field into individual fields
          startY += lineHeight; // Increment the Y-coordinate for each entry

          fields.forEach((fieldText) => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(fieldText, 12.5, startY);
            startY += lineHeight; // Increment the Y-coordinate for each field in the entry
          });
        });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text("EDUCATIONS", 10, 100);
      }

      // Add skills
      const skills = authedJobSeekerData.skills;
      if (skills && skills.length > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text("SKILLS", 10, 150);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        let lineY = 158; // Vertical position of the first line

        for (let i = 0; i < skills.length; i++) {
          const skill = skills[i];
          const skillWidth = doc.getTextWidth(skill);

          // Check if the skill exceeds the available width
          if (
            lineY + 10 > doc.internal.pageSize.getHeight() - 20 ||
            skillWidth > 180
          ) {
            // Move to the next page if there's not enough space or skill width exceeds the maximum width
            doc.addPage();
            lineY = 20; // Set the vertical position to the top of the page
          }
          doc.setTextColor(150, 150, 150);
          doc.text(skill, 12.5, lineY);

          lineY += 7; // Increment the vertical position for the next line
        }
      }
      const socialMediaLinks = authedJobSeekerData.socialMediaLink;
      if (socialMediaLinks && socialMediaLinks.length > 0) {
        const lineHeight = 7; // Adjust as needed
        const maxCharactersPerLine = 25; // Maximum characters per line

        socialMediaLinks.forEach((link, index) => {
          const { key, value } = link;
          let formattedLink = `${key}\n${value}`;

          // Break the line if the text exceeds the maximum characters per line
          if (formattedLink.length > maxCharactersPerLine) {
            const regex = new RegExp(`(.{1,${maxCharactersPerLine}})\\s+`, "g");
            formattedLink = formattedLink.replace(regex, "$1\n");
          }

          const textX = 12.5; // X-coordinate for the text
          const textY = 210 + index * lineHeight; // Y-coordinate for the text

          // Write the social media text
          doc.setFont("helvetica", "normal");
          doc.setFontSize(6.5);
          doc.setTextColor(150, 150, 150); // Black color
          doc.text(value, textX, textY); // Value (increased font size)

          // Increase the font size for the key
          doc.setFontSize(10); // Adjust the font size as needed
          doc.setTextColor(0, 0, 0); // Black color
          doc.text(key, textX, textY - 3); // Key (adjusted position)
        });

        // Additional code for the "Contact" heading
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text("SOCIAL MEDIA LINKS", 10, 200); // Adjust the position as needed
      }
      // EDUCATIONS
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0); // Black color
      doc.text("WORK EXPERINCE", 80, 190);

      doc.save("resume.pdf");
    };

    img.onerror = (error) => {
      console.error("Error loading image:", error);
    };
  };
  // const handleGenerateCV = () => {
  //   if (!authedJobSeekerData) {
  //     // Handle the case when authedJobSeekerData is not available
  //     console.error("Authed Job Seeker Data is not available.");
  //     return;
  //   }
  //   // console.log("This is authedJobSeekerData inside the handleGenerateCV",autedUserData)
  //   const doc = new jsPDF();

  //   const resumeContent = <Resume data={authedJobSeekerData} />;
  //   const resumeHtml = renderToStaticMarkup(resumeContent);

  //   const images = Array.from(resumeHtml.matchAll(/<img.*?src="(.*?)"/g)).map(
  //     (match) => match[1]
  //   );

  //   const promises = images.map((src) => {
  //     return new Promise((resolve, reject) => {
  //       const img = new Image();
  //       img.crossOrigin = "anonymous";
  //       img.src = src;

  //       img.onload = () => resolve(img);
  //       img.onerror = (error) => reject(error);
  //     });
  //   });

  //   Promise.all(promises)
  //     .then((images) => {
  //       images.forEach((imgData, index) => {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");
  //         canvas.width = imgData.width;
  //         canvas.height = imgData.height;
  //         ctx.drawImage(imgData, 0, 0);

  //         const imageData = canvas.toDataURL("image/jpeg", 1.0);

  //         if (index === 0) {
  //           // Add profile image to the PDF
  //           doc.addImage(imageData, "JPEG", 10, 10, 50, 50);
  //         } else {
  //           // Add other images to the first page
  //           doc.addImage(imageData, "JPEG", 10, 70, 50, 50);
  //         }
  //       });

  //       // Extract text content from HTML
  //       const tempElement = document.createElement("div");
  //       tempElement.innerHTML = resumeHtml;
  //       const textContent = tempElement.textContent || tempElement.innerText;

  //       // Add styled text content to the first page
  //       doc.setFont("helvetica", "bold");
  //       doc.setFontSize(16);
  //       doc.text(autedUserData.username, 105, 20, { align: "center" });
  //       doc.setFont("helvetica", "normal");
  //       doc.setFontSize(12);
  //       doc.text(textContent, 20, 40);

  //       doc.save("resume.pdf");
  //     })
  //     .catch((error) => {
  //       console.error("Error generating PDF:", error);
  //     });
  // };

  return (
    <div className="p-4">
      <h1 className="ps-3 text-gray-500 text-2xl">Settings</h1>
      <div className="tabs flex justify-start items-cente gap-2 my-5 border-b-[1px] border-gray-300">
        <div
          className={`tab ${
            activeTab === 1
              ? "active border-b-[2px] cursor-pointer border-blue-500 text-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
              : "cursor-pointer text-gray-500 hover:text-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
          }`}
          onClick={() => handleTabClick(1)}
        >
          <GoPerson size={24} className="mr-1" />
          Personal
        </div>
        <div
          className={`tab ${
            activeTab === 2
              ? "cursor-pointer active border-b-[2px] text-blue-500 border-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
              : "cursor-pointer text-gray-500 hover:text-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
          }`}
          onClick={() => handleTabClick(2)}
        >
          <CgProfile size={24} className="mr-2" />
          Profile
        </div>
        <div
          className={`tab ${
            activeTab === 3
              ? "cursor-pointer active text-blue-500 border-b-[2px] border-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
              : "cursor-pointer text-gray-500 hover:text-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500"
          }`}
          onClick={() => handleTabClick(3)}
        >
          <PiGlobeSimpleLight size={24} className="mr-1" />
          Social Links
        </div>
        <div
          className={`tab ${
            activeTab === 4
              ? "cursor-pointer active text-blue-500 border-b-[2px] border-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
              : "cursor-pointer text-gray-500 hover:text-blue-500 hover:border-b-[2px] flex justify-center items-center w-[20%] hover:border-blue-500 py-1"
          }`}
          onClick={() => handleTabClick(4)}
        >
          <FaGraduationCap size={24} className="mr-2" />
          Academics
        </div>
      </div>
      {/* Render content based on active tab */}
      <div>
        {activeTab === 1 && (
          <>
            <div className="flex gap-8">
              <div className="ps-3 w-[30%]">
                <h1>Profile Picture</h1>
                <div className="flex justify-center">
                  <div
                    className={`border-[1px] border-dashed cursor-pointer flex items-center justify-centerpy-[4%] p-[4%]  w-[100%] h-[30vh] ${
                      isDragging ? "border-blue-500" : "border-gray-400"
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={handleContainerClick}
                  >
                    {imagePath ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePath}
                          alt="Uploaded"
                          className="w-full h-full"
                        />
                        {/* bg-red-500 */}
                        <button
                          onClick={handleRemoveImage}
                          className="absolute -top-3 -right-[0.7rem] text-white rounded-[100%] rounded-r-none bg-red-500 hover:bg-red-600 p-1"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className=" text-start">
                        <LuUploadCloud size={30} className="text-gray-500" />
                        <p className="font-serif">
                          <span className="font-semibold ">Browse Photo </span>
                          or{" "}
                          <span className="text-sm font-medium">
                            Drop here max photo size is 5mb
                          </span>
                        </p>
                        <input
                          ref={fileInputRef}
                          id="file-input"
                          type="file"
                          defaultValue={imagePath || ""}
                          className="hidden"
                          onChange={handleFileInputChange}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDrop}
                        />
                      </div>
                    )}
                  </div>
                  <div className=""></div>
                </div>
              </div>
              <div className="block w-[70%]">
                <div className="block">
                  <div className="flex gap-5 w-[100%]">
                    <div className="w-[50%]">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-0 focus:border-0 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={first_name || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-0 focus:border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={last_name || ""}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex mt-5 gap-5 w-[100%]">
                    <div className="w-[50%]">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="bg-gray-50 border border-gray-300 focus:border-0 focus:outline-none text-gray-900 text-sm rounded-0 focus:ring-blue-500 focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={username || ""}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Jhon"
                        required
                      />
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="experience"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        className="bg-gray-50 border focus:border-0 focus:outline-none border-gray-300 text-gray-900 text-sm rounded-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1"
                        value={experience || ""}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="portfolio"
                    className="bg-gray-50 border border-gray-300 focus:border-0 focus:outline-none text-gray-900 text-sm rounded-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="flowbite.com"
                    value={portfolio || ""}
                    onChange={(e) => setPortfolio(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <button
                onClick={() => handleTabClick(2)}
                className="bg-blue-500 mt-4 float-end px-4 py-2 rounded-sm text-white text-lg"
              >
                Save Changes
              </button>
            </div>
            <div className="mt-20 ms-4">
              <div className="fw-semibold text-gray-600">
                <h1>Your Cv/Resume</h1>
              </div>
              <div className="flex gap-10 pt-4">
                <div className="flex border-dashed border-2">
                  <button
                    onClick={handleGenerateCV}
                    className="flex items-center p-4 justify-center w-full h-full text-gray-600"
                  >
                    <GiRollingEnergy className="text-2xl mr-2 text-blue-500" />
                    Generate Cv/Resume
                  </button>
                </div>
                <div className="flex border-dashed border-2">
                  <button className="flex items-center p-4 justify-center w-full h-full text-gray-600">
                    <CiCirclePlus className="text-2xl mr-2 text-blue-500" />
                    Add Cv/Resume
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 2 && (
          <>
            <div className="block w-[100%]">
              <div className="block">
                <div className="flex gap-5 w-[100%]">
                  <div className="w-[50%]">
                    <label
                      htmlFor="nationality"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-0 focus:border-0 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ethiopia"
                      value={nationality || ""}
                      onChange={(e) => setNationality(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-[50%]">
                    <label
                      htmlFor="birth_date"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Birth Date:{" "}
                      <span className="text-gray-400">{birth_date}</span>
                    </label>
                    <input
                      type="date"
                      id="birth_date"
                      name="birth_date"
                      className="bg-gray-50 placeholder-gray-500 border border-gray-300 text-gray-900 text-sm rounded-0 focus:border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={birth_date || ""}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex mt-5 gap-5 w-[100%]">
                  <div className="w-[50%]">
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="bg-gray-50 border border-gray-300 focus:border-0 focus:outline-none text-gray-900 text-sm rounded-0 focus:ring-blue-500 focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={location || ""}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-[50%]">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      className="bg-gray-50 border focus:border-0 focus:outline-none border-gray-300 text-gray-900 text-sm rounded-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1"
                      value={gender || ""}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Biography
                </label>
                <textarea
                  type="text"
                  id="bio"
                  name="bio"
                  rows={6}
                  className="bg-gray-50 border border-gray-300 focus:border-0 focus:outline-none text-gray-900 text-sm rounded-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write Your Biography Here. Let Employers Know You...."
                  value={bio || ""}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              onClick={() => handleTabClick(3)}
              className="bg-blue-500 mt-4 float-end px-4 py-2 rounded-sm text-white text-lg"
            >
              Save Changes
            </button>
          </>
        )}
        {activeTab === 3 && (
          <>
            <div className="ps-3 flex w-[100%]">
              <div className="w-full px-[10%] py-5">
                <h1 className="font-serif font-bold text-xl text-gray-800">
                  Social Media Links
                </h1>
                {socialMediaLink?.map((link, index) => (
                  <div key={index}>
                    <select
                      className="w-[20%] mb-2 h-12 px-2 focus:outline-none border"
                      value={link.key || ""} // Bind to the key property
                      onChange={(e) => handleSocialMediaChange(index, e)}
                      name="key" // Set the name property to "key"
                    >
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="telegram">Telegram</option>
                    </select>
                    <input
                      type="text"
                      className="w-[55%] mb-2 h-12 border border-l-0 ps-2"
                      name="value"
                      placeholder="Enter link"
                      value={link.value}
                      onChange={(e) => handleSocialMediaChange(index, e)}
                    />
                    <button
                      className="mb-2 h-12 border border-l-0 px-2"
                      onClick={() => handleRemoveSocialMedia(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="w-[92%] bg-transparent hover:bg-blue-400 text-blue-300 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleAddSocialMedia}
                >
                  Add Social Media
                </button>
              </div>
            </div>
            <div className="flex px-[11.2%] float-end">
              <button
                onClick={() => handleTabClick(4)}
                className="py-2 text-lg px-4 text-white rounded-sm bg-blue-500"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
        {activeTab === 4 && (
          <>
            <div className="flex justify-center gap-7">
              <div className="w-[50%]">
                {educations?.map((education, index) => (
                  <div key={index}>
                    <select
                      className="w-[20%] mb-2 h-12 px-2 focus:outline-none border"
                      value={education.key || ""}
                      onChange={(event) => handleKeyChange(event, index)}
                    >
                      <option value="main">Main</option>
                      <option value="sub">Sub</option>
                    </select>
                    <input
                      type="text"
                      className="w-[55%] mb-2 h-12 border border-l-0 ps-2"
                      name="field"
                      placeholder="Enter field"
                      value={education.field || ""}
                      onChange={(event) => handleFieldChange(event, index)}
                    />
                    <button
                      className="mb-2 h-12 border border-l-0 px-2"
                      onClick={() => handleRemoveEducation(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddEducation}
                  className="w-[92%] bg-transparent hover:bg-blue-400 text-blue-300 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Add Education
                </button>
              </div>

              <div className="w-[50%]">
                {skills?.map((skill, index) => (
                  <div key={index}>
                    <input
                      className="w-[55%] mb-2 h-12 border ps-2 focus:outline-none"
                      type="text"
                      value={skill || ""}
                      onChange={(e) => handleSkillChange(index, e)}
                    />
                    <button
                      className="h-12 border border-l-0 px-2"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  className="w-[72%] bg-transparent hover:bg-blue-400 text-blue-300 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </button>
              </div>
            </div>
            <button
              className=" py-2 bg-light-blue-500 rounded-sm text-white px-3 flex float-end me-14 mt-7"
              onClick={() => handleUpdate()}
            >
              Save Updates
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Settings;
