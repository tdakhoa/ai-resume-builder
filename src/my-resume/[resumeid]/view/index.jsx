import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "@service/GlobalAPI";
import { RWebShare } from "react-web-share";
import { Loader2Icon } from "lucide-react";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const { resumeid } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalAPI.GetResumeById(resumeid).then((resp) => {
      setResumeInfo(resp.data.data);
      setLoading(false);
    });
  };

  const HandlePrint = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div
          className={`my-10 mx-10 md:mx-20 lg:mx-36 ${
            loading ? "blur-sm" : ""
          }`}
        >
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your AI resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you're ready to download your resume
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandlePrint} disabled={loading}>
              Download
            </Button>
            <RWebShare
              data={{
                text: "Hi there, this is my resume",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeid +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  "'s Resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button disabled={loading}>Share</Button>
            </RWebShare>
          </div>
        </div>
        {loading && (
          <div className="w-full h-full bg-white/80 flex items-center justify-center z-50">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </div>
      <div
        id="print"
        className={`my-10 mx-10 md:mx-20 lg:mx-36 ${loading ? "blur-sm" : ""}`}
      >
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
