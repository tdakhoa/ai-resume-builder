import React from "react";
import DOMPurify from "dompurify";

function ExperiencePreview({ resumeInfo }) {
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
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}{" "}
            <span>
              {formatDate(experience?.startDate)} {"to "}
              {experience?.currentlyWorking
                ? "Present"
                : formatDate(experience?.endDate)}
            </span>
          </h2>
          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(experience?.workSummery || ""),
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
