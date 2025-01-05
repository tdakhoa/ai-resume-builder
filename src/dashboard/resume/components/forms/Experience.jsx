import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalAPI from "@service/GlobalAPI";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(
    resumeInfo?.experience || [formField]
  );
  const [loading, setLoading] = useState(false);
  const { resumeid } = useParams();

  useEffect(() => {
    if (
      resumeInfo?.experience &&
      JSON.stringify(resumeInfo.experience) !== JSON.stringify(experienceList)
    ) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const AddNewExperience = () => {
    setExperienceList((prev) => [...prev, { ...formField }]);
  };
  ``;

  const RemoveExperience = () => {
    setExperienceList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleRichTextEditor = (value, name, index) => {
    setExperienceList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalAPI.UpdateResumeDetail(resumeid, data).then(
      () => {
        setLoading(false);
        toast("Details updated!");
      },
      () => {
        setLoading(false);
        toast("Server error! Please try again");
      }
    );
  };

  useEffect(() => {
    if (
      JSON.stringify(resumeInfo?.experience) !== JSON.stringify(experienceList)
    ) {
      setResumeInfo((prev) => ({
        ...prev,
        experience: experienceList,
      }));
    }
  }, [experienceList, resumeInfo, setResumeInfo]);

  const changeMonthInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    value={item.title}
                    name="title"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    value={item.companyName}
                    name="companyName"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    value={item.city}
                    name="city"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    value={item.state}
                    name="state"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    name="startDate"
                    type="month"
                    value={changeMonthInput(item.startDate)}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    name="endDate"
                    type="month"
                    value={changeMonthInput(item.endDate)}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item.workSummery}
                    onRichTextEditorChange={(value) =>
                      handleRichTextEditor(value, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExperience}
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveExperience}
            >
              - Remove
            </Button>
          </div>
          <Button type="submit" disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
