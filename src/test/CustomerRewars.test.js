import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import CustomerRewars from "../Components/CustomerRewars";

describe("CustomerRewars", () => {
    const mockData = {
        customerName: "Vaibhav",
        transaction: [
            {
                date: "2024-01-01",
                amount: 120
            }
        ]
    }

    it("customer name", () => {
        const customerName = mockData.customerName.toUpperCase()
        render(<CustomerRewars customerData={mockData} />)
        expect(screen.getByText(`Customer Name: ${customerName}`)).toBeInTheDocument();
    })
})