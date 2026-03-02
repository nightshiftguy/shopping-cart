import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Cart from "/src/components/Cart";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";

describe("Cart component", () => {
  it("Shows cart is empty message", ()=>{
    const routes = [
      {
        path:'/', 
        element: <Outlet context={{itemsInCart:[]}}/>,
        children: [
          {index:true, element: <Cart/>}
        ],
      }
    ]
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router}></RouterProvider>);
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  })

  it("Renders items", () => {
    const itemsInCart = [
      {id:0, title:"item1", count: 1},{id:1, title:'item2', count:2}
    ]
    const routes = [
      {
        path:'/', 
        element: <Outlet context={{itemsInCart}}/>,
        children: [
          {index:true, element: <Cart/>}
        ],
      }
    ]

    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router}></RouterProvider>);

    vi.mock('/src/components/CartItem',() => ({
      default: ({item}) => <li data-test-id="item">{JSON.stringify(item)}</li>
    }
    ));
    
    const listElement = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass('cartList');
    expect(listItems.length).toEqual(2);
  });
});