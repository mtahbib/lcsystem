import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Copy,
  Eye,
  FilePlus2,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LCRecord } from "@/types/lc";
import { deleteLC, duplicateLC, useLCRecords } from "@/features/lc/store/lcStore";
import { firstLine } from "@/features/lc/utils";
import PlainMultilineText from "@/components/common/PlainMultilineText";

export default function LCManagement() {
  const navigate = useNavigate();
  const records = useLCRecords();
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<LCRecord | null>(null);
  const [deleting, setDeleting] = useState<LCRecord | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return records;
    return records.filter((r) =>
      [r.lc.lcNumber, r.customer.details, r.beneficiary.details]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [records, search]);

  const handleDelete = () => {
    if (!deleting) return;
    deleteLC(deleting.id);
    toast.success(`LC ${deleting.lc.lcNumber} deleted`);
    setDeleting(null);
  };

  const handleDuplicate = (record: LCRecord) => {
    const copy = duplicateLC(record.id);
    if (copy) toast.success(`Duplicated as LC ${copy.lc.lcNumber}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">LC Repository</h1>
          <p className="mt-2 text-muted-foreground">
            Search, manage, and open saved Letters of Credit.
          </p>
        </div>
        <Button render={<Link to="/lc/new" />} nativeButton={false}>
          <FilePlus2 />
          Create LC
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 md:w-96">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by LC number, customer, beneficiary..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LC Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Beneficiary</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  {records.length === 0
                    ? "No LCs created yet."
                    : "No LCs match your search."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.lc.lcNumber}</TableCell>
                  <TableCell>{firstLine(record.customer.details)}</TableCell>
                  <TableCell>{firstLine(record.beneficiary.details)}</TableCell>
                  <TableCell>{record.lc.issueDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => setViewing(record)}>
                            <Eye className="size-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/lc/${record.id}/edit`)}
                          >
                            <Pencil className="size-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/lc/${record.id}/master-form`)}
                          >
                            <Workflow className="size-4" />
                            Open Master Form
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(record)}>
                            <Copy className="size-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setDeleting(record)}
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(viewing)} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="max-w-lg">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle>LC {viewing.lc.lcNumber}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-3 text-sm">
                <div>
                  <p className="font-medium">Customer</p>
                  <PlainMultilineText text={viewing.customer.details} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Beneficiary</p>
                  <PlainMultilineText text={viewing.beneficiary.details} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Vehicles</p>
                  <p className="text-muted-foreground">
                    {viewing.vehicles.length} vehicle(s)
                  </p>
                </div>
                <div>
                  <p className="font-medium">LC Details</p>
                  <p className="text-muted-foreground">
                    {viewing.lc.currency} · Issued {viewing.lc.issueDate}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete LC {deleting?.lc.lcNumber}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the LC and
              its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
