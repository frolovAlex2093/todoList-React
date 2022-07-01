import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader component", () => {
  it("Loader render", () => {
    render(<Loader />);

    const loader = document.querySelector(".lds-dual-ring");
    expect(loader).toBeInTheDocument;
  });

  it("Loader snapshot", ()=>{
    const loader = render(<Loader />);
    expect(loader).toMatchSnapshot()
  })
});
