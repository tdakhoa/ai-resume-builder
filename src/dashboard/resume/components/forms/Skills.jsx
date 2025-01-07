import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import GlobalAPI from "@service/GlobalAPI";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Skills = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState(
    resumeInfo?.skills || [
      {
        name: "",
        rating: 0,
      },
    ]
  );
  const [loading, setLoading] = useState(false);
  const { resumeid } = useParams();

  const AddNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
    enabledNext(false);
  };

  const RemoveSkill = () => {
    if (skillsList.length > 0) {
      setSkillsList((prev) => prev.slice(0, -1));
      enabledNext(false);
    } else {
      toast("No more skills to remove!");
    }
  };

  const handleChange = (index, name, value) => {
    setSkillsList((prev) => {
      const newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], [name]: value };
      return newEntries;
    });
    enabledNext(false);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalAPI.UpdateResumeDetail(resumeid, data).then(
      (resp) => {
        setLoading(false);
        toast("Details updated!");
        enabledNext(true);
      },
      (error) => {
        setLoading(false);
        toast("Server Error!");
      }
    );
  };

  useEffect(() => {
    if (
      resumeInfo?.skills &&
      JSON.stringify(resumeInfo.skills) !== JSON.stringify(skillsList)
    ) {
      setExperienceList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  useEffect(() => {
    if (JSON.stringify(resumeInfo?.skills) !== JSON.stringify(skillsList)) {
      setResumeInfo((prev) => ({
        ...prev,
        skills: skillsList,
      }));
    }
  }, [skillsList, resumeInfo, setResumeInfo]);

  if (skillsList?.length == 0) enabledNext(false);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-3 mb-2"
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 250 }}
              value={item.rating}
              onChange={(e) => handleChange(index, "rating", e)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddNewSkill}
          >
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={RemoveSkill}
          >
            - Remove
          </Button>
        </div>
        <Button type="submit" disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
