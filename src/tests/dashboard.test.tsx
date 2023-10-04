import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Dashboard from "@/app/dashboard/page";
import TaskCard from "@/components/dashboard/TaskCard";
import { taskListJson } from "@/mocks/json";

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

//NOTE The TaskCard will be extrapolated into a separate test file, so we can test fetched tasks correctly [check task-card.test.ts]
test("Should be able to see the list of fetched tasks with full information", async () => {
  const rerenderParentComp = () => {};
  render(<Dashboard />);
  render(
    <TaskCard
      task={taskListJson.data.tasks[0]}
      rerenderParentComp={rerenderParentComp}
    />
  );
  const taskTitles = screen.getAllByTestId("title");
  expect(taskTitles.length).to.be.greaterThan(0);

  const taskDescriptions = screen.getAllByTestId("description");
  expect(taskDescriptions.length).to.be.greaterThan(0);

  const taskCategories = screen.getAllByTestId("category-badge");
  expect(taskCategories.length).to.be.greaterThan(0);

  const taskPriorities = screen.getAllByTestId("priority-badge");
  expect(taskPriorities.length).to.be.greaterThan(0);

  const taskDueDates = screen.getAllByTestId("due-date");
  expect(taskDueDates.length).to.be.greaterThan(0);
});

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
