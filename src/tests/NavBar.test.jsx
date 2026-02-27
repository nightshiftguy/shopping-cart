import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "/src/components/NavBar";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from '/src/routes'

describe("NavBar component", () => {
  it("renders links", () => {
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><NavBar /></RouterProvider>);

    expect(screen.getByRole('link',{name: 'Homepage'})).toBeInTheDocument();
    expect(screen.getByRole('link',{name: 'Shop'})).toBeInTheDocument();
  });
});