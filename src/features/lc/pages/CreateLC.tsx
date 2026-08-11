import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/components/common/FormField";
import VehicleSection from "@/features/lc/components/VehicleSection";
import { lcFormSchema, type LCFormValues } from "@/features/lc/schema/lcSchema";
import { addLC, getLCById, updateLC } from "@/features/lc/store/lcStore";

const defaultValues: LCFormValues = {
  customer: {
    details: "",
  },
  beneficiary: {
    details: "",
  },
  vehicles: [],
  lc: {
    lcNumber: "",
    issueDate: "",
    currency: "",
  },
};

export default function CreateLC() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const existing = id ? getLCById(id) : undefined;
  const isEditMode = Boolean(existing);

  const form = useForm<LCFormValues>({
    resolver: zodResolver(lcFormSchema),
    defaultValues: existing ?? defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: LCFormValues) => {
    if (isEditMode && existing) {
      updateLC(existing.id, values);
      toast.success("LC updated successfully");
    } else {
      addLC(values);
      toast.success("LC saved successfully");
    }
    navigate("/lc");
  };

  const onInvalid = () => {
    toast.error("Please fix the highlighted fields before saving");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Edit LC" : "Create LC"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter all customer, beneficiary, vehicle, and LC details once.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              label="Customer Details"
              error={errors.customer?.details?.message}
            >
              <Textarea
                rows={6}
                placeholder={"AHMED TRADING\n75, SABUJBAG, DHAKA-1214 BANGLADESH."}
                {...register("customer.details")}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Type each line exactly as it should appear on documents, under the
                "CUSTOMER DETAILS:" heading.
              </p>
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiary Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              label="Corporation Address"
              error={errors.beneficiary?.details?.message}
            >
              <Textarea
                rows={6}
                placeholder={
                  "TMT CORPORATION CO., LTD.\nADDRESS: 934-0027 TOYAMA-KEN,\nIMIZU-SHI, NAKASHINMINATO 17-1,\nAPA GARDEN PALACE NAKASHIN 715 JAPAN\nTEL: 0766-73-6255\nFAX: 0766-50-8574\nWEBSITE: www.tmtcarz.com"
                }
                {...register("beneficiary.details")}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Type each line exactly as it should appear on documents. The first
                line prints bold and larger as the company name; every line after
                it prints smaller.
              </p>
            </FormField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <VehicleSection />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LC Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <FormField label="LC Number" error={errors.lc?.lcNumber?.message}>
              <Input {...register("lc.lcNumber")} />
            </FormField>
            <FormField label="Issue Date" error={errors.lc?.issueDate?.message}>
              <Input type="date" {...register("lc.issueDate")} />
            </FormField>
            <FormField label="Currency" error={errors.lc?.currency?.message}>
              <Input placeholder="USD" {...register("lc.currency")} />
            </FormField>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/lc")}
          >
            Cancel
          </Button>
          <Button type="submit">{isEditMode ? "Update LC" : "Save LC"}</Button>
        </div>
      </form>
    </FormProvider>
  );
}
