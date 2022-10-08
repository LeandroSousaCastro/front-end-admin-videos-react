import { renderWithProviders } from "../../utils/test-utils";
import { EditCastMember } from "./EditCastMember";

describe("EditCastMember test", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<EditCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });
});
