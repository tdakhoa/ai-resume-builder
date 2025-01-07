import React from "react";

function EducationalPreview({ resumeInfo }) {
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}-${year}`;
  };

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {education?.universityName}
          </h2>
          <h2 className="text-xs flex justify-between">
            {education?.degree} in {education?.major}
            <span>
              {formatDate(education?.startDate)} to{" "}
              {formatDate(education?.endDate)}
            </span>
          </h2>
          <p className="text-xs my-2"> {education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
