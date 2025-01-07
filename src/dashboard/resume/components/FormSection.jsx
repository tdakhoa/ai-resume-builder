import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection({ setLoading }) {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enabledNext, setEnabledNext] = useState(false);
  const { resumeid } = useParams();

  const handleBack = () => {
    setActiveFormIndex(activeFormIndex - 1);
    setEnabledNext(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor setLoading={setLoading} />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button size="sm" disabled={!enabledNext} onClick={handleBack}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            disabled={!enabledNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex == 1 ? (
        <PersonalDetails enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Education enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Skills enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 6 ? (
        <Navigate to={"/my-resume/" + resumeid + "/view"} />
      ) : null}
    </div>
  );
}

export default FormSection;
