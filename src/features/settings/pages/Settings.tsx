import { useRef } from "react";
import { toast } from "sonner";
import { Upload, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resetLogo, setLogo, useSettings } from "@/features/settings/store/settingsStore";

export default function Settings() {
  const settings = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
      toast.success("Logo updated");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage document branding used across generated LC documents.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Logo</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <div className="flex size-24 items-center justify-center rounded-lg border bg-slate-50">
            <img src={settings.logo} alt="Company logo" className="size-16 object-contain" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              This logo appears on every generated document. Company name, address,
              and other letterhead details are still entered per LC in the
              Beneficiary section.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-4" />
                Upload Logo
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  resetLogo();
                  toast.success("Logo reset to default");
                }}
              >
                <RotateCcw className="size-4" />
                Reset to Default
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
