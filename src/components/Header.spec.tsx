import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header test", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
  });
});
