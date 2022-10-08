import { GridFilterModel } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoriesTable } from "./CategoryTable";

const Props = {
  data: {
    data: [
      {
        id: "a5dea69f-c97b-4ee9-a55c-4ecada14410c",
        name: "Test",
        description: "Some description",
        is_active: true,
        created_at: "2022-10-07 17:25:28",
      },
    ],
    meta: {
      total: 4,
      current_page: 1,
      last_page: 1,
      first_page: 1,
      per_page: 15,
      to: 1,
      from: 4,
    },
  },
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 20, 30],
  handleOnPageChange: (page: number) => {},
  handleFilterChange: (filterModel: GridFilterModel) => {},
  handleOnPageSizeChange: (pageSize: number) => {},
  handleDelete: (id: string) => {},
};

describe("CategoriesTable test", () => {
  it("should render castMember table correctly", () => {
    const { asFragment } = render(<CategoriesTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with loading", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with empty data", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} data={{ data: [], meta: {} } as any} />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render castMember table with correct is active", () => {
    const { asFragment } = render(
      <CategoriesTable
        {...Props}
        data={
          {
            data: [{ ...Props.data.data[0], is_active: false }],
            meta: { ...Props.data.meta },
          } as any
        }
      />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
