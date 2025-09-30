# Delivery Day Stock Display Feature

## Overview
Implemented stock display and availability management for delivery days on the Taze Yeşillikler Paketi (Fresh Greens Package) subscription page.

## Changes Made

### 1. API Client Enhancement (`lib/api-client.ts`)
Added new method `getDeliveryDayStock()` to fetch daily stock data:

```typescript
async getDeliveryDayStock(_productId?: number) {
    // Mock data implementation - ready to be connected to backend API
    return Promise.resolve({
        data: {
            1: 0,  // Pazartesi - disabled by default
            2: 15, // Salı - 15 stock available
            3: 8,  // Çarşamba - 8 stock available
            4: 20, // Perşembe - 20 stock available
            5: 0,  // Cuma - no stock
            6: 12, // Cumartesi - 12 stock available
            7: 0,  // Pazar - disabled by default
        }
    });
}
```

**Note:** Currently using mock data. To connect to a real API:
- Uncomment the API call line in the method
- Remove the mock data Promise.resolve()
- Ensure the backend endpoint `/api/delivery-stock` is implemented

### 2. Delivery Day Configuration
Updated delivery days configuration on both pages to include `alwaysInactive` flag:

```typescript
const deliveryDays = [
    { id: 1, name: "Pazartesi", shortName: "Pzt", alwaysInactive: true },
    { id: 2, name: "Salı", shortName: "Sal", alwaysInactive: false },
    { id: 3, name: "Çarşamba", shortName: "Çar", alwaysInactive: false },
    { id: 4, name: "Perşembe", shortName: "Per", alwaysInactive: false },
    { id: 5, name: "Cuma", shortName: "Cum", alwaysInactive: false },
    { id: 6, name: "Cumartesi", shortName: "Cmt", alwaysInactive: false },
    { id: 7, name: "Pazar", shortName: "Paz", alwaysInactive: true },
];
```

### 3. Pages Updated

#### A. `/app/abonelik/taze-yesillikler-paketi/page.tsx`
- Added `deliveryDayStock` state to store stock data
- Created `fetchDeliveryDayStock()` function to load stock data
- Updated delivery day selector UI to show:
  - **Stock count** below each active day
  - **"Stok yok"** for days with 0 stock
  - **Strike-through text** with red styling for out-of-stock days
  - **Disabled state** for Pazartesi (Monday) and Pazar (Sunday)
- Changed default selected day from `1` (Pazartesi) to `2` (Salı/Tuesday)

#### B. `/app/abonelik/page.tsx`
- Applied same stock display logic to the main subscription page
- Simplified stock display with smaller text ("Yok" instead of "Stok yok")
- Consistent styling and behavior across both pages

## Visual Design

### Day States:

1. **Active with Stock** (e.g., Salı with 15 stock)
   - White background with gray border
   - Hover effect with darker border
   - Stock count displayed below in gray text
   - Clickable and selectable

2. **Out of Stock** (e.g., Cuma with 0 stock)
   - Red background (bg-red-50)
   - Red border (border-red-200)
   - Red text color
   - Strike-through on day name
   - "Stok yok" in red text below
   - Disabled and not clickable

3. **Always Inactive** (Pazartesi, Pazar)
   - Gray background (bg-gray-50)
   - Gray border (border-gray-200)
   - Gray text color
   - No stock display
   - Disabled and not clickable

4. **Selected Day**
   - Dark gray background (bg-gray-600)
   - White text
   - Can only be selected if active and has stock

## User Experience

### Features:
- ✅ Real-time stock display for each delivery day
- ✅ Visual feedback for availability (color-coded)
- ✅ Automatic disabling of unavailable days
- ✅ Monday and Sunday permanently disabled
- ✅ Default selection to first available day (Tuesday)
- ✅ Clear stock count indicators
- ✅ Responsive design for mobile and desktop

### User Flow:
1. User visits subscription page
2. Stock data loads automatically
3. Days with 0 stock are visually marked (red + strikethrough)
4. User can only select available days with stock
5. Selected day is highlighted in dark gray
6. Stock count helps user make informed decisions

## Technical Details

### State Management:
```typescript
const [deliveryDayStock, setDeliveryDayStock] = useState<Record<number, number>>({});
```

### Stock Fetching:
```typescript
const fetchDeliveryDayStock = useCallback(async () => {
    try {
        const response = await apiClient.getDeliveryDayStock();
        if (response.data) {
            setDeliveryDayStock(response.data);
        }
    } catch (err) {
        console.error("Error fetching delivery day stock:", err);
    }
}, []);
```

### Conditional Rendering Logic:
```typescript
const stock = deliveryDayStock[day.id] ?? 0;
const isInactive = day.alwaysInactive || stock === 0;
const isSelected = selectedDeliveryDay === day.id;
```

## Future Enhancements

### Backend Integration:
To connect this feature to a real backend API:

1. Create backend endpoint `/api/delivery-stock` that returns:
   ```json
   {
       "data": {
           "1": 0,
           "2": 15,
           "3": 8,
           "4": 20,
           "5": 0,
           "6": 12,
           "7": 0
       }
   }
   ```

2. Update the `getDeliveryDayStock()` method in `lib/api-client.ts`:
   ```typescript
   async getDeliveryDayStock(_productId?: number) {
       return this.request(`/api/delivery-stock${_productId ? `?productId=${_productId}` : ''}`);
   }
   ```

### Possible Improvements:
- [ ] Real-time stock updates using WebSocket
- [ ] Stock refresh on user interaction
- [ ] Low stock warning (e.g., "Only 2 left!")
- [ ] Stock history and trends
- [ ] Admin dashboard to manage daily stock
- [ ] Automatic stock calculation based on production capacity
- [ ] Email notifications when stock is replenished

## Testing

### Manual Testing Checklist:
- [ ] Navigate to `/abonelik/taze-yesillikler-paketi`
- [ ] Verify stock numbers display correctly
- [ ] Check that Pazartesi and Pazar are disabled (gray)
- [ ] Verify days with 0 stock show red styling and strikethrough
- [ ] Test clicking on available days vs unavailable days
- [ ] Check that default selection is Salı (Tuesday)
- [ ] Verify responsive design on mobile and desktop
- [ ] Test on main `/abonelik` page as well

## Files Modified

1. **lib/api-client.ts** - Added `getDeliveryDayStock()` method
2. **app/abonelik/taze-yesillikler-paketi/page.tsx** - Full stock display implementation
3. **app/abonelik/page.tsx** - Simplified stock display for overview page

## Screenshots Reference

### Stock Display States:
- Available day: "15 kota" in gray text
- Out of stock: "Stok yok" in red with strikethrough
- Always inactive: No stock display

### Color Scheme:
- Available: Gray borders, white background
- Out of stock: Red borders, red background tint
- Inactive: Gray borders, gray background
- Selected: Dark gray background, white text

---

**Date:** September 30, 2025
**Developer:** Claude (AI Assistant)
**Status:** ✅ Implemented and Ready for Testing
