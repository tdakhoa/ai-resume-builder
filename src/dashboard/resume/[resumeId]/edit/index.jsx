import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalAPI from "@service/GlobalAPI";
import { Loader2Icon } from "lucide-react";

function EditResume() {
  const { resumeid } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    setLoading(true);
    GlobalAPI.GetResumeById(resumeid).then(
      (resp) => {
        setResumeInfo(resp.data.data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 p-10 gap-10 ${
            loading ? "blur-sm" : ""
          }`}
        >
          <FormSection setLoading={setLoading} />
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
