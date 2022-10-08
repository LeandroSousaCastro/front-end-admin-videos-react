import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberForm } from "./CastMemberForm";

const Props = {
  castMember: {
    id: "1",
    name: "Test",
    type: 1,
    created_at: "2022-10-10T00:00:00.000000Z",
  },
  isDisabled: true,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe("CastMemberForm test", () => {
  it("should render castMember form correctly", () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form from with loading state", () => {
    const { asFragment } = render(<CastMemberForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember form from with disable state", () => {
    const { asFragment } = render(
      <CastMemberForm {...Props} isDisabled={true} isLoading={true} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
