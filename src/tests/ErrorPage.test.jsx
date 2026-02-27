import { render, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import ErrorPage from "../components/ErrorPage";
import { createMemoryRouter, MemoryRouter } from "react-router";
import routes from "../routes";

describe("Error page", ()=>{
    it("Renders link to main page", ()=>{
        const router = createMemoryRouter(routes);
        render(<MemoryRouter router={router}><ErrorPage/></MemoryRouter>);
        expect(screen.getByRole('link').textContent).toMatch(/main page/i);
    })
})