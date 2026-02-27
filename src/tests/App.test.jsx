import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "/src/components/App";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from '/src/routes'

describe("App component", () => {
  it("Renders one main element", () => {
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}><App /></RouterProvider>);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
