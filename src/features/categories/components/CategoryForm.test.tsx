import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";

const Props = {
  category: {
    id: "1",
    name: "Test",
    description: "Some description",
    is_active: true,
    created_at: "2022-10-10T00:00:00.000000Z",
  },
  isDisabled: true,
  isLoading: false,
  handleSubmit: () => {},
  handleChange: () => {},
  handleToggle: () => {},
};

describe("CategoryForm test", () => {
  it("should render category form correctly", () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render category form from with loading state", () => {
    const { asFragment } = render(<CategoryForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render category form from with disable state", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled={true} isLoading={true} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
