import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/Home";

test("get text", () => {
    const {getByText} = render(<Home />);
    const headEle = getByText(/Customer Rewards/i)
    expect(headEle).toBeInTheDocument();
})
