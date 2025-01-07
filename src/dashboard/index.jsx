import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalAPI from "@service/GlobalAPI";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";
import { Loader2Icon } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetResumesList = () => {
    setLoading(true);
    GlobalAPI.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setLoading(false);
        setResumeList(resp.data.data);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
        <h2 className="font-bold text-3xl">My Resume</h2>
        <p>Start Creating AI resume for your next Job role</p>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5 ${
            loading ? "blur-sm" : ""
          }`}
        >
          <AddResume />
          {resumeList.length > 0 &&
            resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
