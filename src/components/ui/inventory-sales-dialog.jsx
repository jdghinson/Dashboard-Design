import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label"
import { Plus, Minus, Trash2, CreditCard, Smartphone, Banknote, Building2 } from "lucide-react";


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

// Updated payment methods with icons
const paymentMethods = [
  { 
    id: "credit-card", 
    name: "Credit Card",
    icon: CreditCard
  },
  { 
    id: "momo", 
    name: "Mobile Money",
    icon: Smartphone
  },
  { 
    id: "cash", 
    name: "Physical Cash",
    icon: Banknote
  },
  { 
    id: "bank-transfer", 
    name: "Bank Transfer",
    icon: Building2
  }
];

// Component for individual payment method cards
const PaymentMethodCard = ({ method, selected, onSelect }) => {
const Icon = method.icon;
return (
  <button
    type="button"
    onClick={() => onSelect(method.id)}
    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
      ${selected 
        ? 'border-slate-600 bg-slate-700 text-slate-50' 
        : 'border-slate-200 hover:border-slate-700 hover:bg-gray-50'
      }
    `}
  >
    <Icon className={`h-6 w-6 mb-2 ${selected ? 'text-slate-50' : 'text-gray-600'}`} />
    <span className={`text-sm font-medium ${selected ? 'text-slate-50' : 'text-gray-700'}`}>
      {method.name}
    </span>
  </button>
);
};


// Main sales dialog component
const InventorySalesDialog = ({ onSale }) => {
  const [selectedItems, setSelectedItems] = useState([]); // Tracks items in cart
  const [searchTerm, setSearchTerm] = useState(""); // Tracks search input
  const [showResults, setShowResults] = useState(false); // Controls search results visibility
  const [paymentMethod, setPaymentMethod] = useState(""); // Tracks selected payment method


  // Filter inventory items based on search term and already selected items
  const filteredItems = inventoryData
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedItems.some(selected => selected.id === item.id)
    );

  // Handler for adding an item to the cart
  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    setSearchTerm("");
    setShowResults(false);
  };

  // Handler for updating item quantities
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

  // Calculate total amount for all items in cart
  const totalAmount = selectedItems.reduce((sum, item) => 
    sum + (item.quantity * item.unitPrice), 0
  );

  // Handler for completing the sale
  const handleSale = () => {
    if (selectedItems.length === 0) return;
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    // Prepare sale data
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
    
    // Reset form after sale
    setSelectedItems([]);
    setPaymentMethod("");
  };

  return (
    <div className="space-y-6">
      {/* Search Input Section */}
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
        
        {/* Search Results Dropdown */}
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

      {/* Selected Items List */}
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

              {/* Item total price */}
              <div className="w-28 text-right">
                GH₵{(item.quantity * item.unitPrice).toFixed(2)}
              </div>

              {/* Delete item button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-50 hover:text-red-500"
                onClick={() => {
                  setSelectedItems(items => items.filter(i => i.id !== item.id));
                }}
                >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary and Payment Section */}
      {selectedItems.length > 0 && (
        <>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 justify-end rounded-lg">
              <span style={{ fontSize: "20px" , fontWeight: "400" }}>Total</span>
              <span style={{ fontSize: "24px" , fontWeight: "600" }}>GH₵{totalAmount.toFixed(2)}</span>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    selected={paymentMethod === method.id}
                    onSelect={setPaymentMethod}
                  />
                ))}
              </div>
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