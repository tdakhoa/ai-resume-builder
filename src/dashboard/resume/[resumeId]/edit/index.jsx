import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalAPI from "@service/GlobalAPI";

function EditResume() {
  const { resumeid } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalAPI.GetResumeById(resumeid).then((resp) => {
      setResumeInfo(resp.data.data);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
