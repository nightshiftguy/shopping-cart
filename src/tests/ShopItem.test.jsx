import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopItem from "/src/components/ShopItem";
import userEvent from "@testing-library/user-event";

describe("ShopItem component", () => {
    const item = {
        "id": 0,
        "title": "title",
        "price": 0.1,
        "description": "description",
        "category": "string",
        "image": "http://example.com"
    }

  it("Renders title", () => {

    render(<ShopItem item={item}/>);

    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  it("Sets count using buttons", async () => {
    const user = userEvent.setup();

    render(<ShopItem item={item}/>);
    const addButton = screen.getByTestId('addButton');
    const subtractButton = screen.getByTestId('subtractButton');

    await user.click(addButton);
    await user.click(addButton);
    expect(screen.getByRole('textbox').value).toBe('3')

    await user.click(subtractButton);
    expect(screen.getByRole('textbox').value).toBe('2')
  });

  it("Don't allow count < 0 using buttons", async () => {
    const user = userEvent.setup();

    render(<ShopItem item={item}/>);
    const addButton = screen.getByTestId('addButton');
    const subtractButton = screen.getByTestId('subtractButton');

    await user.click(subtractButton);
    await user.click(subtractButton);
    expect(screen.getByRole('textbox').value).toBe('1')
  });

  it("Sets count using input", async () => {
    const user = userEvent.setup();

    render(<ShopItem item={item}/>);
    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, '3');
    expect(input.value).toBe('3')
  });

  it("Add to cart button works", async ()=>{
    const user = userEvent.setup();
    const addToCart = vi.fn((itemId, quantity)=>0)

    render(<ShopItem item={item} handleAddToCart={addToCart}/>);
    const addToCartButton = screen.getByTestId('addToCartButton');
    const input = screen.getByRole('textbox');

    await user.type(input, '2');
    await user.click(addToCartButton);
    expect(addToCart).toHaveBeenCalledWith(0, 12)
  })

    it("Don't allow count < 0", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn((itemId, quantity)=>0)

    render(<ShopItem item={item} handleAddToCart={addToCart}/>);
    const input = screen.getByRole('textbox');
    const addToCartButton = screen.getByTestId('addToCartButton');

    await user.clear(input);
    await user.type(input, '-1');
    await user.click(addToCartButton);
    expect(input.value).toBe('1')
  });

  it("Don't allow letters", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn((itemId, quantity)=>0)

    render(<ShopItem item={item} handleAddToCart={addToCart}/>);
    const input = screen.getByRole('textbox');
    const addToCartButton = screen.getByTestId('addToCartButton');

    await user.type(input, 'abcdef');
    await user.click(addToCartButton);
    expect(input.value).toBe('1')
  });
});