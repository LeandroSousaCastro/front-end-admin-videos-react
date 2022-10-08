import { rest } from "msw";
import { setupServer } from "msw/node";
import { baseUrl } from "../api/apiSlice";
import { CreateCategory } from "./CreateCategory";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";

export const handlers = [
  rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
];

const server = setupServer(...handlers);

describe("CreateCategory test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CreateCategory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handler submit success", async () => {
    renderWithProviders(<CreateCategory />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const isActive = screen.getByTestId("is_active");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(description, { target: { value: "Description" } });
    fireEvent.click(isActive);

    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Success create category")).toBeInTheDocument();
    });
  });

  it("should handler submit error", async () => {
    server.use(
      rest.post(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.delay(150), ctx.status(500));
      })
    );

    renderWithProviders(<CreateCategory />);
    const name = screen.getByTestId("name");
    const description = screen.getByTestId("description");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(description, { target: { value: "Description" } });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(screen.getByText("Category not created")).toBeInTheDocument();
    });
  });
});
