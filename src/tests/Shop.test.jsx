import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Shop from "/src/components/Shop";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";

describe("Shop component", () => {
  it("Shows loading info", ()=>{
    const routes = [
      {
        path:'/', 
        element: <Outlet context={{items:null, loading: true, error:null, handleAddToCart: ()=>{}}}/>,
        children: [
          {index:true, element: <Shop/>}
        ],
      }
    ]
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router}></RouterProvider>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  })

  it("Shows error info", ()=>{
    const routes = [
      {
        path:'/', 
        element: <Outlet context={{items:null, loading: false, error:{message : "No shopping today"}, handleAddToCart: ()=>{}}}/>,
        children: [
          {index:true, element: <Shop/>}
        ],
      }
    ]
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router}></RouterProvider>);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  })

  it("Renders items", () => {
    const items = [
      {id:1, title:"item1"},{id:2, title:'item2'}
    ]
    const routes = [
      {
        path:'/', 
        element: <Outlet context={{items, loading: false, error:null, handleAddToCart: ()=>{}}}/>,
        children: [
          {index:true, element: <Shop/>}
        ],
      }
    ]

    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router}></RouterProvider>);

    vi.mock('/src/components/ShopItem',() => ({
      default: ({item}) => <li data-test-id="item">{item.title}</li>
    }
    ));
    
    const listElement = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass('shopList');
    expect(listItems.length).toEqual(2);
  });
});