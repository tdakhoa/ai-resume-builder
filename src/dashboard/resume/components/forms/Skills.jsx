import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import GlobalAPI from "@service/GlobalAPI";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Skills = () => {
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
  };

  const RemoveSkill = () => {
    setSkillsList((skillsList) => skillsList.splice(0, -1));
  };

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
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
      setSkillsList(resumeInfo.skills);
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
