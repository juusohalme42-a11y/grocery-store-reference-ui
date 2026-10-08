const shopWindow = document.getElementById('shopWindow');
const inventoryGrid = document.getElementById('inventoryGrid');
const shopGrid = document.getElementById('shopGrid');
const playerName = document.getElementById('playerName');
const playerMoney = document.getElementById('playerMoney');
const inventoryUsage = document.getElementById('inventoryUsage');
const usageFill = document.getElementById('usageFill');

const defaultInventory = [
    { name: 'bread', label: 'Bread', count: 1, icon: '🥖' },
    { name: 'water', label: 'Water', count: 2, icon: '💧' },
    { name: 'milk', label: 'Milk', count: 1, icon: '🥛' },
    { name: 'energy', label: 'Energy', count: 1, icon: '⚡' },
    { name: 'donut', label: 'Donut', count: 3, icon: '🍩' },
    { name: 'sprunk', label: 'Sprunk', count: 1, icon: '🧃' },
    { name: 'sandwich', label: 'Sandwich', count: 2, icon: '🥪' }
];

const defaultShop = [
    { name: 'bread', label: 'Bread', price: 12, icon: '🥖' },
    { name: 'water', label: 'Water', price: 15, icon: '💧' },
    { name: 'milk', label: 'Milk', price: 18, icon: '🥛' },
    { name: 'energy', label: 'Energy', price: 22, icon: '⚡' },
    { name: 'donut', label: 'Donut', price: 10, icon: '🍩' },
    { name: 'sprunk', label: 'Sprunk', price: 14, icon: '🧃' },
    { name: 'sandwich', label: 'Sandwich', price: 26, icon: '🥪' },
    { name: 'burger', label: 'Burger', price: 28, icon: '🍔' }
];

function renderInventory(items) {
    inventoryGrid.innerHTML = '';

    items.forEach((item) => {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';

        const qty = document.createElement('div');
        qty.className = 'slot-qty';
        qty.textContent = item.count;

        const icon = document.createElement('div');
        icon.className = 'slot-icon';
        icon.textContent = item.icon;

        const label = document.createElement('div');
        label.className = 'slot-label';
        label.textContent = item.label;

        slot.appendChild(qty);
        slot.appendChild(icon);
        slot.appendChild(label);
        inventoryGrid.appendChild(slot);
    });
}

function renderShop(items) {
    shopGrid.innerHTML = '';

    items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'shop-card';

        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.textContent = item.icon;

        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = item.label;

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = '$' + item.price;

        card.appendChild(icon);
        card.appendChild(label);
        card.appendChild(price);

        card.addEventListener('click', () => {
            fetch(`https://${GetParentResourceName()}/buyItem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ item: item.name })
            });
        });

        shopGrid.appendChild(card);
    });
}

window.addEventListener('message', (event) => {
    const data = event.data;

    if (data.action === 'openShop') {
        playerName.textContent = data.playerName || 'Jorma Ukkojenmala';
        playerMoney.textContent = data.money || '€ 2,500';
        inventoryUsage.textContent = data.inventoryUsage || '1.8kg / 5kg';
        usageFill.style.width = (data.usagePercent || 38) + '%';

        renderInventory(data.inventory || defaultInventory);
        renderShop(data.shopItems || defaultShop);
        shopWindow.classList.remove('hidden');
    }

    if (data.action === 'closeShop') {
        shopWindow.classList.add('hidden');
    }
});

const closeBtn = document.querySelector('.bottom-actions button:last-child');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        fetch(`https://${GetParentResourceName()}/closeMenu`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({})
        });
    });
}
