import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, FilePlus2, MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";

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
import type { ProformaInvoiceRecord } from "@/types/proforma";
import {
  deleteProformaInvoice,
  useProformaInvoices,
} from "@/features/proforma/store/proformaStore";
import { formatDate } from "@/features/documents/templates/documentHelpers";

export default function ProformaList() {
  const navigate = useNavigate();
  const records = useProformaInvoices();
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<ProformaInvoiceRecord | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return records;
    return records.filter((r) =>
      [r.invoiceNo, r.importerName].join(" ").toLowerCase().includes(q)
    );
  }, [records, search]);

  const handleDelete = () => {
    if (!deleting) return;
    deleteProformaInvoice(deleting.id);
    toast.success(`Proforma invoice ${deleting.invoiceNo} deleted`);
    setDeleting(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Proforma Invoices</h1>
          <p className="mt-2 text-muted-foreground">
            Standalone invoices issued before an LC exists — not linked to the LC
            Repository.
          </p>
        </div>
        <Button render={<Link to="/proforma/new" />} nativeButton={false}>
          <FilePlus2 />
          New Proforma Invoice
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 md:w-96">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by invoice no or importer..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No</TableHead>
              <TableHead>Importer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Units</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  {records.length === 0
                    ? "No proforma invoices created yet."
                    : "No proforma invoices match your search."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.invoiceNo}</TableCell>
                  <TableCell>{record.importerName}</TableCell>
                  <TableCell>{formatDate(record.issueDate)}</TableCell>
                  <TableCell>{record.vehicles.length}</TableCell>
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
                          <DropdownMenuItem
                            onClick={() => navigate(`/proforma/${record.id}`)}
                          >
                            <Eye className="size-4" />
                            View / Print
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => navigate(`/proforma/${record.id}/edit`)}
                          >
                            <Pencil className="size-4" />
                            Edit
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

      <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete proforma invoice {deleting?.invoiceNo}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
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
