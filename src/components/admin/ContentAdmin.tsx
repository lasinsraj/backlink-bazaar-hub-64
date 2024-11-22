import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ContentAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Content</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Page
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page Title</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Home</TableCell>
            <TableCell>/</TableCell>
            <TableCell>2024-03-15</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>About</TableCell>
            <TableCell>/about</TableCell>
            <TableCell>2024-03-14</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell>/contact</TableCell>
            <TableCell>2024-03-13</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};