import React, { useEffect, useState } from "react";
import { Button } from "./button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "./dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

export function TableDemo({ setStats }) {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // Number of items to show per page
    
    // Modified data structure to include multiple items per sales ID
    const invoices = [
      {
        salesId: "INV-001",
        time: "02:34 pm",
        items: [
          { name: "Men's trousers", quantity: 3, unitPrice: 125.00 },
          { name: "Men's shirts", quantity: 2, unitPrice: 85.00 },
          { name: "Men's belt", quantity: 1, unitPrice: 45.00 }
        ],
        paymentMethod: "Credit Card",
      },
      {
        salesId: "INV-002",
        time: "02:00 pm",
        items: [
          { name: "Women's scarves", quantity: 4, unitPrice: 37.50 },
          { name: "Women's hat", quantity: 1, unitPrice: 65.00 }
        ],
        paymentMethod: "Momo",
      },
      {
        salesId: "INV-003",
        time: "01:45 pm",
        items: [
          { name: "Women's bags", quantity: 5, unitPrice: 70.00 },
          { name: "Women's wallet", quantity: 2, unitPrice: 45.00 },
          { name: "Women's sunglasses", quantity: 1, unitPrice: 120.00 }
        ],
        paymentMethod: "Bank Transfer",
      },
      {
        salesId: "INV-004",
        time: "12:15 pm",
        items: [
          { name: "Men's gloves", quantity: 3, unitPrice: 150.00 },
          { name: "Men's scarf", quantity: 2, unitPrice: 85.00 }
        ],
        paymentMethod: "Cash",
      },
      {
        salesId: "INV-005",
        time: "11:30 am",
        items: [
          { name: "Women's loungewear", quantity: 9, unitPrice: 60.00 },
          { name: "Women's slippers", quantity: 3, unitPrice: 40.00 }
        ],
        paymentMethod: "Cash",
      },
      {
        salesId: "INV-006",
        time: "10:00 am",
        items: [
          { name: "Children's trench coats", quantity: 2, unitPrice: 100.00 },
          { name: "Children's boots", quantity: 2, unitPrice: 75.00 },
          { name: "Children's hats", quantity: 4, unitPrice: 25.00 }
        ],
        paymentMethod: "Bank Transfer",
      },
      {
        salesId: "INV-007",
        time: "09:06 am",
        items: [
          { name: "Men's trousers", quantity: 1, unitPrice: 300.00 },
          { name: "Men's jacket", quantity: 1, unitPrice: 450.00 }
        ],
        paymentMethod: "Credit Card",
      },
    ];

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
      }).format(amount);
    };

    const calculateInvoiceTotal = (items) => {
        return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    };

    const totalAmount = React.useMemo(() => {
        return invoices.reduce((sum, invoice) => 
          sum + calculateInvoiceTotal(invoice.items), 0
        );
    }, []);

    const totalItems = React.useMemo(() => {
        return invoices.reduce((sum, invoice) => 
          sum + invoice.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
        );
    }, []);

    const totalEntries = invoices.length;

    useEffect(() => {
        if (typeof setStats === 'function') {
          setStats(prev => ({
            ...prev,
            sales: Number(totalAmount.toFixed(2)),
            items: totalItems,
            entries: totalEntries
          }));
        }
    }, [totalAmount, totalItems, totalEntries, setStats]);

    // Calculate pagination
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentInvoices = invoices.slice(startIndex, endIndex);

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Time</TableHead>
                        <TableHead>Sales ID</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead className="text-right">Items Sold</TableHead>
                        <TableHead className="text-right">Total Amount</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => {
                        const totalForInvoice = calculateInvoiceTotal(invoice.items);
                        const itemCount = invoice.items.reduce((sum, item) => sum + item.quantity, 0);
                        return (
                            <TableRow key={invoice.salesId}>
                                <TableCell className="font-medium">{invoice.time}</TableCell>
                                <TableCell>{invoice.salesId}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{itemCount}</TableCell>
                                <TableCell className="text-right">{formatCurrency(totalForInvoice)}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outline" 
                                        size="m"
                                        onClick={() => setSelectedInvoice(invoice)}
                                        className="w-full h-full whitespace-nowrap p-2 hover:bg-slate-200"
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-end mt-6">
                <p className="text-sm text-muted-foreground whitespace-nowrap p-2">
                    {startIndex + 1}-{Math.min(endIndex, invoices.length)} of {invoices.length} entries
                </p>
                <Pagination className="justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            />
                        </PaginationItem>
                        
                        {getPageNumbers().map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
              </div>

            <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Sales Details - {selectedInvoice?.salesId}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-muted-foreground">Time</p>
                                <p className="font-medium">{selectedInvoice?.time}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="font-medium">{selectedInvoice?.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Items</p>
                                <p className="font-medium">
                                    {selectedInvoice?.items.reduce((sum, item) => sum + item.quantity, 0)}
                                </p>
                            </div>
                        </div>
                        
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item Name</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                        <TableHead className="text-right">Unit Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedInvoice?.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">
                                                {formatCurrency(item.unitPrice)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatCurrency(item.quantity * item.unitPrice)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-4 text-right">
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="text-xl font-bold">
                                {selectedInvoice && formatCurrency(calculateInvoiceTotal(selectedInvoice.items))}
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}