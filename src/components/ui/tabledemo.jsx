import React, { useEffect } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "./table"
   


export function TableDemo({ setStats }) {
    const invoices = [
      {
        time: "02:34 pm",
        itemName: "Men's trousers",
        quantity: 3,
        unitPrice: 125.00,
        category: "--",
        paymentMethod: "Credit Card",
      },
      {
        time: "02:00 pm",
        itemName: "Women's scarves",
        quantity: 4,
        unitPrice: 37.50,
        category: "--",
        paymentMethod: "Momo",
      },
      {
        time: "01:45 pm",
        itemName: "Women's bags",
        quantity: 5,
        unitPrice: 70.00,
        category: "--",
        paymentMethod: "Bank Transfer",
      },
      {
        time: "12:15 pm",
        itemName: "Men's gloves",
        quantity: 3,
        unitPrice: 150.00,
        category: "--",
        paymentMethod: "Cash",
      },
      {
        time: "11:30 am",
        itemName: "Women's loungewear",
        quantity: 9,
        unitPrice: 60.00,
        category: "--",
        paymentMethod: "Cash",
      },
      {
        time: "10:00 am",
        itemName: "Children's trench coats",
        quantity: 2,
        unitPrice: 100.00,
        category: "--",
        paymentMethod: "Bank Transfer",
      },
      {
        time: "09:06 am",
        itemName: "Men's trousers",
        quantity: 1,
        unitPrice: 300.00,
        category: "--",
        paymentMethod: "Credit Card",
      },
    ]
  
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS'
      }).format(amount)
    }
  
    // Calculate total amount of items sold
    const totalAmount = React.useMemo(() => {
        return invoices.reduce((sum, invoice) => 
          sum + (invoice.quantity * invoice.unitPrice), 0
        );
    }, []);

    // Calculate total number of items sold
    const totalItems = React.useMemo(() => {
        return invoices.reduce((sum, invoice) => 
          sum + invoice.quantity, 0
        );
    }, []);

     // Add this to calculate number of entries
     const totalEntries = invoices.length;

    useEffect(() => {
        if (typeof setStats === 'function') {  // Add this check
          setStats(prev => ({
            ...prev,
            sales: Number(totalAmount.toFixed(2)),
            items: totalItems,
            entries: totalEntries
          }));
        }
    }, [totalAmount, setStats]);
    
  
    return (

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Quantity</TableHead>
            {/* <TableHead className="text-right">Unit Price</TableHead> */}
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => {
            const totalForItem = invoice.quantity * invoice.unitPrice;
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{invoice.time}</TableCell>
                <TableCell>{invoice.itemName}</TableCell>
                <TableCell>{invoice.category}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                {/* <TableCell className="text-right">{formatCurrency(invoice.unitPrice)}</TableCell> */}
                <TableCell className="text-right">{formatCurrency(totalForItem)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }