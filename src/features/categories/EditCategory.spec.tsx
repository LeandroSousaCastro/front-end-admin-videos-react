import { renderWithProviders } from "../../utils/test-utils";
import { EditCategory } from "./EditCategory";

describe("EditCategory test", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<EditCategory />);
    expect(asFragment()).toMatchSnapshot();
  });
});
