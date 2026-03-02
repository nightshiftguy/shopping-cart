import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, useOutletContext } from "react-router";
import routes from '/src/routes'

import App from "/src/components/App";
import HomePage from "/src/components/Homepage";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  it("Renders one main element", () => {
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it("Adds items in cart", async () => {
    const routes = [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
        ]
      }
    ]
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    
    vi.mock('/src/useItems', ()=>({
      default: ()=>({items: [{id:0, title:"item1"},{id:1, title:"item2"}], error: null, loading: false})
    })
    );

    vi.mock('/src/components/HomePage', ()=>(
      {
        default : ()=>{
          const {handleAddToCart, itemsInCart, handleRemoveFromCart, setItemCount} = useOutletContext();
          return (
            <>
              <p data-testid="items">{JSON.stringify(itemsInCart)}</p>
              <button data-testid="addToCart1" onClick={()=>handleAddToCart(0,2)}></button>
              <button data-testid="addToCart2" onClick={()=>handleAddToCart(1,3)}></button>
              <button data-testid="addToCart3" onClick={()=>handleAddToCart(1,3)}></button>
              <button data-testid="removeFromCart1" onClick={()=>handleRemoveFromCart(1)}></button>
              <button data-testid="removeFromCart2" onClick={()=>handleRemoveFromCart(1,1)}></button>
              <button data-testid="removeFromCart3" onClick={()=>handleRemoveFromCart(1,3)}></button>
              <button data-testid="setCount" onClick={()=>setItemCount(0,10)}></button>
            </>
          );
        }
      })
    );
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    await user.click(screen.getByTestId('addToCart1'));
    await user.click(screen.getByTestId('addToCart2'));
    //should contain one item
    expect(screen.getByTestId('items').textContent).toMatchSnapshot();

  });

  it("Adds existing items to cart", async () => {
    const routes = [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
        ]
      }
    ]
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    await user.click(screen.getByTestId('addToCart2'));
    await user.click(screen.getByTestId('addToCart3'));
    //should contain one item
    expect(screen.getByTestId('items').textContent).toMatchSnapshot();
  });

  it("Removes items from cart", async () => {
    const routes = [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
        ]
      }
    ]
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    await user.click(screen.getByTestId('addToCart2'));
    await user.click(screen.getByTestId('removeFromCart1'));

    expect(screen.getByTestId('items').textContent).toMatchSnapshot();
  });

  it("Decreases items count cart", async () => {
    const routes = [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
        ]
      }
    ]
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    await user.click(screen.getByTestId('addToCart2'));
    await user.click(screen.getByTestId('removeFromCart2'));

    expect(screen.getByTestId('items').textContent).toMatchSnapshot();
  });

  it("Removes from cart when count reaches 0", async () => {
    const routes = [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
        ]
      }
    ]
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    await user.click(screen.getByTestId('addToCart2'));
    await user.click(screen.getByTestId('removeFromCart3'));

    expect(screen.getByTestId('items').textContent).toMatchSnapshot();
  });

  it("Sets item count", async () => {
    const routes = [
      {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <HomePage/>
          },
        ]
      }
    ]
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    await user.click(screen.getByTestId('addToCart1'));
    await user.click(screen.getByTestId('setCount'));

    expect(screen.getByTestId('items').textContent).toMatchSnapshot();
  });
});
