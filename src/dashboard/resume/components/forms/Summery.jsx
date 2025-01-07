import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAPI from "@service/GlobalAPI";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "@service/AIModal";
import { toast } from "sonner";

const prompt =
  "Job Title: {jobTitle}, depends on job title give me summery for my resume within 4-5 lines in JSON format with an array include two field ExperienceLevel and Summery, experience level for Fresher, Mid-Level, Experienced";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGemeratedSummeryList] = useState();

  useEffect(() => {
    summery && setResumeInfo({ ...resumeInfo, summery: summery });
  }, [summery]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: { summery: summery } };
    GlobalAPI.UpdateResumeDetail(params?.resumeid, data).then(
      (resp) => {
        enabledNext(true);
        setLoading(false);
        toast("Detail updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
    setAiGemeratedSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const handleChange = (e) => {
    setSummery(e.target.value);
    enabledNext(false);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Tell people more about you</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            defaultValue={resumeInfo?.summery}
            onChange={handleChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>

          {aiGeneratedSummeryList.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level: {item?.ExperienceLevel}</h2>
              <p>{item?.Summery}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
