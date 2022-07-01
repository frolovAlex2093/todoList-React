import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

const todoCount = 4

describe("Header component", () => {
    it("Header render", () => {
      render(<Header todoCount={todoCount}/>);
  
      expect(screen.getByText("Todo list 4 task(s)")).toBeInTheDocument;
    });

    it("Header snapshot", () => {
        const header = render(<Header todoCount={todoCount}/>);

        expect(header).toMatchSnapshot()
    })
  });
  