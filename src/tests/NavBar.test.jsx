import { describe, it, expect, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "/src/components/NavBar";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from '/src/routes'

describe("NavBar component", () => {
  it("renders links", () => {
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.getByRole('link',{name: 'Homepage'})).toBeInTheDocument();
    expect(screen.getByRole('link',{name: 'Shop'})).toBeInTheDocument();
  });

  it("don't shows count of items in cart when it's empty", () => {
    const routes = [{path: '/', element: <NavBar itemsInCart={[]}/>}]
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.queryByTestId('itemCount')).not.toBeInTheDocument();
  });

  it("shows count of items in cart", () => {
    const routes = [{path: '/', element: <NavBar itemsInCart={[{id:0, title:"item1", count:1},{id:1, title:"item2", count: 2}]}/>}]

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.getByTestId('itemCount').textContent).toMatch(/3/i);
  });
});