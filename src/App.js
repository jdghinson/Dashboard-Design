import React, { useState, useEffect } from "react";
import { AppSidebar } from "./components/ui/app-sidebar"
import {
  ChevronDown,
  UserCircle2,
  Settings,
  LogOut,
  Plus
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import { Input } from "./components/ui/input";
import { InfoIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { Separator } from "./components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar"
import { Skeleton } from "./components/ui/skeleton";
import { TableDemo } from "./components/ui/tabledemo";



const StatsCard = ({ isLoading, label, value }) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <Skeleton className="h-4 w-24 mb-3" /> {/* For label */}
        <Skeleton className="h-10 w-32" /> {/* For value */}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <h4 className="text-4xl font-bold">{value}</h4>
    </div>
  );
};


export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
      sales: 0.00,
      items: 10,
      entries: 0
    });
  
  useEffect(() => {
    // Simulate API call with 1-second delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Selling an item
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 20; // Example unit price
  const totalPrice = unitPrice * quantity;

  const handleRecordSale = () => {
    alert(`Recorded sale for ${itemName} - Quantity: ${quantity}, Total Price: $${totalPrice}`);
    setItemName("");
    setQuantity(1);
  };



  return (
    (<SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-muted/50">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
           <div className="flex items-center w-full justify-between py-4">
            <h2 className="text-xl">Dashboard</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <span>John Doe</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-0 p-6">

        {/* Using Modal */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-600">Today, 8th November</h3>

            {/* Sheet Trigger for Selling New Item */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg h-auto font-normal text-base flex items-center hover:bg-teal-700 hover:text-white"
                  variant="ghost"
                >
                  <Plus className="h-5 w-5 mr-2 stroke-[2.5] hover:stroke-white" />
                  Sell New Item(s)
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader className="mb-4">
                  <DialogTitle>Sell Item</DialogTitle>
                  <DialogDescription>
                    Enter the item details to record a sale.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="form-group mb-4">
                  <Label className="block text-sm font-medium text-gray-700">Item Name</Label>
                  <Input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                    className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus-visible:ring-teal-500"
                  />
                </div>
                
                <div className="form-group mb-4">
                  <Label className="block text-sm font-medium text-gray-700">Quantity</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                    className="input-field mt-1 block w-full rounded-md border-gray-300 shadow-sm focus-visible:ring-teal-500"
                  />
                </div>
                
                <Alert className="bg-blue-50">
                  <InfoIcon className="h-4 w-4 stroke-[2.5] stroke-blue-500"/>
                  <AlertTitle>Summary</AlertTitle>
                  <AlertDescription>
                    Total Price: GH₵{totalPrice}
                  </AlertDescription>
                </Alert>

                <DialogFooter>
                  <Button onClick={handleRecordSale} className="bg-teal-600 text-white px-4 py-4 rounded-lg h-auto w-full font-normal text-base flex items-center hover:bg-teal-700 hover:text-white"
                    variant="ghost">
                    Record Sale
                  </Button>
                </DialogFooter>

              </DialogContent>
            </Dialog>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <StatsCard
              isLoading={isLoading}
              label="Total Sales"
              value={<>
                <span className="text-gray-500 text-xl font-medium">GH₵ </span>
                {Number(stats.sales).toFixed(2)}
              </>}
            />
            <StatsCard 
              isLoading={isLoading}
              label="Total Items Sold"
              value={stats.items}
            />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-white md:min-h-min p-6 mt-8">
            <h1 className="mb-6 mt-2 text-xl font-medium text-neutral-700">Transaction Details</h1>
            <TableDemo setStats={setStats}/>
            <div className="flex items-center justify-end space-x-2 py-4 pl-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {stats.entries} entries made.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled="true"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled="true"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}