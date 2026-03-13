// task 2
function getInventoryValuation(Inventory) {
    // code
    const value = {};
    for (const item of Inventory) {
        const { category, price, qty } = item;
        if (!value[category]) {
            value[category] = 0;
        }
        value[category] += price * qty;
    }

    return value;
}

// test Code
const testInventory = [
    { name: 'Monitor', qty: 2, price: 200, category: 'Tech' },
    { name: 'Mouse', qty: 0, price: 50, category: 'Tech' },
    { name: 'Desk', qty: 1, price: 300, category: 'Furniture' },
    { name: 'Lamp', qty: 2, price: 50, category: 'Furniture' }
];
console.log(getInventoryValuation(testInventory));

// expected Output: {Tech: 400  , Furniture: 400}
