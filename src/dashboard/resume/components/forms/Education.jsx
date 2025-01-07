import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "@service/GlobalAPI";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const educationField = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationList] = useState(
    resumeInfo?.education || [educationField]
  );
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedEducationList = [...educationalList];
    updatedEducationList[index] = {
      ...updatedEducationList[index],
      [name]: value,
    };
    setEducationList(updatedEducationList);
    enabledNext(false);
  };

  const AddNewEducation = (event, index) => {
    setEducationList([...educationalList, educationField]);
    enabledNext(false);
  };

  const RemoveEducation = (event, index) => {
    setEducationList((educationalList) => educationalList.slice(0, -1));
    enabledNext(false);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalAPI.UpdateResumeDetail(params.resumeid, data).then(
      (resp) => {
        setLoading(false);
        toast("Details updated!");
        enabledNext(true);
      },
      (error) => {
        setLoading(false);
        toast("Server error! Please try again ");
      }
    );
  };

  useEffect(() => {
    if (resumeInfo?.education) {
      if (
        JSON.stringify(resumeInfo.education) !== JSON.stringify(educationalList)
      ) {
        setEducationList(resumeInfo.education);
      }
    }
  }, [resumeInfo]);

  useEffect(() => {
    if (
      JSON.stringify(resumeInfo?.education) !== JSON.stringify(educationalList)
    ) {
      setResumeInfo((prev) => ({
        ...prev,
        education: educationalList,
      }));
    }
  }, [educationalList, resumeInfo, setResumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  value={item.universityName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  value={item.major}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Start date</label>
                <Input
                  name="startDate"
                  value={item.startDate}
                  type="month"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  name="endDate"
                  value={item.endDate}
                  type="month"
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewEducation}
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveEducation}
            >
              - Remove
            </Button>
          </div>
          <Button type="submit" disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;
