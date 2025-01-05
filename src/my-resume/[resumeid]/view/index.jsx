import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "@service/GlobalAPI";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalAPI.GetResumeById(resumeid).then((resp) => {
      setResumeInfo(resp.data.data);
    });
  };

  const HandlePrint = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your AI resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you're ready to download your resume
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandlePrint}>Download</Button>
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
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
