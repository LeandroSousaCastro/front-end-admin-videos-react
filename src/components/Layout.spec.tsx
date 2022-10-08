import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Header test", () => {
  it("should render correctly", () => {
    const { asFragment } = render(
      <Layout>
        <div>test</div>
      </Layout>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
