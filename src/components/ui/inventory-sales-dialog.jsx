import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label"
import { Plus, Minus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./select";

// Sample inventory data
const inventoryData = [
  {
    id: 1,
    name: "Men's trousers",
    unitPrice: 125.00,
    inStock: 50
  },
  {
    id: 2,
    name: "Women's scarves",
    unitPrice: 37.50,
    inStock: 30
  },
  {
    id: 3,
    name: "Women's bags",
    unitPrice: 70.00,
    inStock: 25
  },
  {
    id: 4,
    name: "Men's gloves",
    unitPrice: 150.00,
    inStock: 40
  },
  {
    id: 5,
    name: "Women's loungewear",
    unitPrice: 60.00,
    inStock: 35
  }
];

// Payment methods
const paymentMethods = [
    { id: "credit-card", name: "Credit Card" },
    { id: "momo", name: "Mobile Money" },
    { id: "cash", name: "Physical Cash" },
    { id: "bank-transfer", name: "Bank Transfer" }
];

const InventorySalesDialog = ({ onSale }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const filteredItems = inventoryData
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedItems.some(selected => selected.id === item.id)
    );

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    setSearchTerm("");
    setShowResults(false);
  };

  const updateQuantity = (itemId, increment) => {
    setSelectedItems(items =>
      items.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + increment);
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      })
    );
  };

  const totalAmount = selectedItems.reduce((sum, item) => 
    sum + (item.quantity * item.unitPrice), 0
  );

  const handleSale = () => {
    if (selectedItems.length === 0) return;
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    onSale({
      items: selectedItems,
      totalAmount,
      paymentMethod,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }).toLowerCase()
    });
    
    setSelectedItems([]);
    setPaymentMethod("");
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
            className="focus-visible:ring-teal-500 py-6"
            type="text"
            placeholder="Search for an item"
            value={searchTerm}
            onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
        />
        
        {showResults && searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="py-1">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No items found
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => handleAddItem(item)}
                  >
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-gray-500">
                        GH₵{item.unitPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex-1">
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setSelectedItems(items =>
                    items.map(i =>
                      i.id === item.id ? { ...i, quantity: value } : i
                    )
                  );
                }}
                className="w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <div className="w-28 text-right">
                GH₵{(item.quantity * item.unitPrice).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 justify-end rounded-lg">
              <span style={{ fontSize: "20px" , fontWeight: "400" }}>Total</span>
              <span style={{ fontSize: "24px" , fontWeight: "600" }}>GH₵{totalAmount.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod} >
                <SelectTrigger className="w-full py-6 focus:ring-teal-500">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSale}
            className="w-full bg-teal-600 text-white px-4 py-4 rounded-lg h-auto font-normal text-base flex items-center hover:bg-teal-700 hover:text-white"
          >
            Record sales
          </Button>
        </>
      )}
    </div>
  );
};

export default InventorySalesDialog;