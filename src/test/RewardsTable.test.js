import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import RewardsTable from "../Components/RewardsTable";

const mockData = [
    {
        amount: 100,
        year: 2023,
        monthName: "March",
        points: 50
    },
    {
        amount: 120,
        year: 2023,
        monthName: "August",
        points: 90
    },
    {
        amount: 75,
        year: 2024,
        monthName: "February",
        points: 25
    },
]

describe("RewardTable", () => {

    it("total reward", () => {
        const total = mockData.reduce((acc,reward) => acc + reward.amount,0)
        render(<RewardsTable monthlyRewards={mockData} />)
        expect(screen.getByText(`Total: ${total}`)).toBeInTheDocument()
    })

    it("display table", () => {

        render(<RewardsTable monthlyRewards={mockData} />)
        expect(screen.getByText(/Year/i)).toBeInTheDocument()
        expect(screen.getByText(/Months/i)).toBeInTheDocument()
        expect(screen.getByText(/Amount/i)).toBeInTheDocument()
        expect(screen.getByText(/Points/i)).toBeInTheDocument()

        expect(screen.getByText(/2023/i)).toBeInTheDocument()
        expect(screen.getByText(/March/i)).toBeInTheDocument()
        expect(screen.getByText(/100/i)).toBeInTheDocument()
        expect(screen.getByText(/50/i)).toBeInTheDocument()

        expect(screen.getByText(/August/i)).toBeInTheDocument()
        expect(screen.getByText(/120/i)).toBeInTheDocument()
        expect(screen.getByText(/90/i)).toBeInTheDocument()

        expect(screen.getByText(/2024/i)).toBeInTheDocument()
        expect(screen.getByText(/February/i)).toBeInTheDocument()
        expect(screen.getByText(/75/i)).toBeInTheDocument()
        expect(screen.getByText(/25/i)).toBeInTheDocument()
    })
})