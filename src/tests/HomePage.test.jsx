import { render, screen } from "@testing-library/react";
import { describe, it, expect} from "vitest";
import HomePage from "/src/components/HomePage";
import { createMemoryRouter, MemoryRouter } from "react-router";
import routes from "../routes";

describe("HomePage component ", ()=>{
    it("Renders welcome message", ()=>{
        const router = createMemoryRouter(routes);
        render(<HomePage/>);
        expect(screen.getByRole('heading').textContent).toMatch(/Welcome/i);
    })
    it("Renders main image", ()=>{
        const router = createMemoryRouter(routes);
        render(<HomePage/>);
        expect(screen.queryByRole('presentation')).not.toBeNull();
    })
})