import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Dashboard from "@/app/dashboard/page";

test("Should be able to see the title", async () => {
  const { getByTestId } = render(<Dashboard />);

  const topSection = getByTestId("title");
  expect(topSection).to.exist;
});

test("Should be able to see search feature", async () => {
  const { getByPlaceholderText } = render(<Dashboard />);

  const feature = getByPlaceholderText("Search");
  expect(feature).to.exist;
});

test("Should be able to see the add new task button", async () => {
  const { getByText } = render(<Dashboard />);

  const feature = getByText("Add New Task");
  expect(feature).to.exist;
});

test("Should be able to see the filter button", async () => {
  const { getByText } = render(<Dashboard />);

  const feature = getByText("Filter");
  expect(feature).to.exist;
});

//NOTE The TaskCard will be extrapolated into a separate test file [check task-card.test.ts]

test("Should be able to see teh pagination", async () => {
  const { getByTestId } = render(<Dashboard />);
  const paginationSection = getByTestId("pagination");
  expect(paginationSection).to.exist;
});

//Snapshot Testing
it("Dashboard should match snapshots", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
