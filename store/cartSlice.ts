import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "@/interfaces";

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "failed";
}

const initialState: CartState = {
  items: [],
  status: "idle",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const res = await fetch("/api/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  const data = await res.json();
  return data.items as CartItem[];
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(i => i.productId === action.payload.productId);
      if (index >= 0) state.items[index].quantity += action.payload.quantity;
      else state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const index = state.items.findIndex(i => i.productId === action.payload.productId);
      if (index >= 0) state.items[index].quantity = action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.status = "loading"; })
      .addCase(fetchCart.fulfilled, (state, action) => { state.items = action.payload; state.status = "idle"; })
      .addCase(fetchCart.rejected, (state) => { state.status = "failed"; });
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
