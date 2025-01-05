import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalAPI from "@service/GlobalAPI";
import { toast } from "sonner";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalAPI.DeleteResumeById(resume.documentId).then(
      (resp) => {
        toast("Resume deleted!");
        refreshData();
        setLoading(false);
        setOpenDialog(false);
      },
      (error) => {
        setLoading(false);
        setOpenDialog(false);
      }
    );
  };

  return (
    <div className="border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary">
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center h-[280px] rounded-t-lg"
          style={{ borderColor: resume?.themeColor }}
        >
          <Notebook />
        </div>
      </Link>
      <div
        className="p-3 flex justify-between text-wrap rounded-b-lg border-b-0"
        style={{
          borderColor: resume?.themeColor,
          backgroundColor: resume?.themeColor,
        }}
      >
        <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
          <h2 className="text-sm text-white">{resume.title}</h2>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;
