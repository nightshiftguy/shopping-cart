import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CartItem from "/src/components/CartItem";
import userEvent from "@testing-library/user-event";

describe("CartItem component", ()=>{
    it("Renders title, price and count", ()=>{
        render(<CartItem item={{id:0, title:"item1", count: 1, price: "1.99"}}/>);
        expect(screen.getByText(/item1/i)).toHaveRole('heading');
        expect(screen.getByRole('textbox').value).toBe("1");
        expect(screen.getByText(/1.99/i)).toBeInTheDocument();
    });

    it("Sets count using buttons", async () => {
        const user = userEvent.setup();
        const addToCart = vi.fn((itemId, count)=>{})
        const removeFromCart = vi.fn((itemId, count=undefined)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 2, price: "1.99"}} handleAddToCart={addToCart} handleRemoveFromCart={removeFromCart}/>);
        const addButton = screen.getByTestId('addButton');
        const subtractButton = screen.getByTestId('subtractButton');
    
        await user.click(addButton);
        expect(addToCart).toBeCalledWith(0,1)
    
        await user.click(subtractButton);
        expect(removeFromCart).toBeCalledWith(0,1)
    });
    
    it("Prevents setting count<1 using buttons", async () => {
        const user = userEvent.setup();
        const removeFromCart = vi.fn((itemId, count=undefined)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 1, price: "1.99"}} handleRemoveFromCart={removeFromCart}/>);
        const subtractButton = screen.getByTestId('subtractButton');
    
        await user.click(subtractButton);
        expect(removeFromCart).toBeCalledTimes(0);
    });

    it("Sets count using input", async () => {
        const user = userEvent.setup();
        const setCount = vi.fn((itemId, count)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 2, price: "1.99"}} setItemCount={setCount}/>);
        const input = screen.getByRole('textbox');

        await user.clear(input);
        await user.type(input, '3');
        expect(input.value).toBe('3')
    });

    it("Input updates count when leaved", async () => {
        const user = userEvent.setup();
        const setCount = vi.fn((itemId, count)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 2, price: "1.99"}} setItemCount={setCount}/>);
        const input = screen.getByRole('textbox');
        const header = screen.queryByRole('heading');

        await user.clear(input);
        await user.type(input, '3');
        await user.click(header)
        expect(input.value).toBe('3')
        expect(setCount).toBeCalledWith(0,3);
    });

    it("Input updates count when Enter clicked", async () => {
        const user = userEvent.setup();
        const setCount = vi.fn((itemId, count)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 2, price: "1.99"}} setItemCount={setCount}/>);
        const input = screen.getByRole('textbox');

        await user.clear(input);
        await user.type(input, '3{Enter}');
        expect(input.value).toBe('3')
        expect(setCount).toBeCalledWith(0,3);
    });

    it("Reset input if it's invalid", async () => {
        const user = userEvent.setup();
        const setCount = vi.fn((itemId, count)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 2, price: "1.99"}} setItemCount={setCount}/>);
        const input = screen.getByRole('textbox');
        const header = screen.queryByRole('heading');

        await user.clear(input);
        await user.type(input, 'bad');
        await user.click(header)
        expect(input.value).toBe('2')
        expect(setCount).toBeCalledWith(0,2);
    });

    it("Can call removing function", async () => {
        const user = userEvent.setup();
        const removeFromCart = vi.fn((itemId, count=undefined)=>{})
    
        render(<CartItem item={{id:0, title:"item1", count: 2, price: "1.99"}} handleRemoveFromCart={removeFromCart}/>);
        const removeButton = screen.getByTestId('removeButton');

        await user.click(removeButton)
        expect(removeFromCart).toBeCalledWith(0);
    });
});