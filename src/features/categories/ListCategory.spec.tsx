import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { ListCategory } from "./ListCategory";
import { categoryResponse, categoryResponsePage2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

describe("ListCategory test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCategory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<ListCategory />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText("Test");
      expect(name).toBeInTheDocument();
    });
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.json(categoryResponse), ctx.status(500));
      })
    );

    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText("Error fetching categories");
      expect(name).toBeInTheDocument();
    });
  });

  it.skip("should handler On Page Change", async () => {
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText("Test");
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText("Test 2");
      expect(name).toBeInTheDocument();
    });
  });
});
