import { useRef } from "react";
import { toast } from "sonner";
import { Upload, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  resetLogo,
  resetProformaLogo,
  setLogo,
  setProformaLogo,
  useSettings,
} from "@/features/settings/store/settingsStore";

interface LogoCardProps {
  title: string;
  description: string;
  logo: string;
  onUpload: (dataUrl: string) => void;
  onReset: () => void;
}

function LogoCard({ title, description, logo, onUpload, onReset }: LogoCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpload(reader.result as string);
      toast.success("Logo updated");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <div className="flex size-24 items-center justify-center rounded-lg border bg-slate-50">
          <img src={logo} alt="Logo" className="size-16 object-contain" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{description}</p>
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
                onReset();
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
  );
}

export default function Settings() {
  const settings = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage document branding. LC documents and Proforma Invoices can use
          separate logos.
        </p>
      </div>

      <LogoCard
        title="LC Document Logo"
        description="Appears on Commercial Invoice, Packing List, Beneficiary Certificate, Shipping Advice, Export Certificate, and Certificate of Origin. Company name, address, and other letterhead details are still entered per LC in the Beneficiary section."
        logo={settings.logo}
        onUpload={setLogo}
        onReset={resetLogo}
      />

      <LogoCard
        title="Proforma Invoice Logo"
        description="Appears only on Proforma Invoices, independent of the LC document logo above. Company name, address, and contact details are entered per invoice in the Proforma Invoice form."
        logo={settings.proformaLogo}
        onUpload={setProformaLogo}
        onReset={resetProformaLogo}
      />
    </div>
  );
}
