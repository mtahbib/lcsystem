import { useNavigate } from "react-router-dom";
import { Bell, Search, Settings } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search customers, LCs, shipments..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon">
                <Bell className="size-5" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <p className="px-2 py-3 text-sm text-muted-foreground">
                No new notifications.
              </p>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100">
                <Avatar size="sm">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Admin</span>
              </button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="size-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
