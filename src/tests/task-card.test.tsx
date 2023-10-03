import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import TaskCard from "@/components/dashboard/TaskCard";
import { taskJson } from "@/mocks/json";

const rerenderParentComp = () => {};

test("Should be able to see the category badge", async () => {
  const { getByTestId } = render(
    <TaskCard task={taskJson} rerenderParentComp={rerenderParentComp} />
  );

  const topSection = getByTestId("category-badge");
  expect(topSection).to.exist;
});

test("Should be able to see the task title", async () => {
  const { getByTestId } = render(
    <TaskCard task={taskJson} rerenderParentComp={rerenderParentComp} />
  );

  const feature = getByTestId("title");
  expect(feature).to.exist;
});

test("Should be able to see the task description", async () => {
  const { getByTestId } = render(
    <TaskCard task={taskJson} rerenderParentComp={rerenderParentComp} />
  );

  const feature = getByTestId("description");
  expect(feature).to.exist;
});

test("Should be able to see the task due date", async () => {
  const { getByTestId } = render(
    <TaskCard task={taskJson} rerenderParentComp={rerenderParentComp} />
  );

  const feature = getByTestId("due-date");
  expect(feature).to.exist;
});

test("Should be able to see the priority badge", async () => {
  const { getByTestId } = render(
    <TaskCard task={taskJson} rerenderParentComp={rerenderParentComp} />
  );

  const feature = getByTestId("priority-badge");
  expect(feature).to.exist;
});

//Snapshot Testing
it("TaskCard should match snapshots", () => {
  const tree = renderer
    .create(
      <TaskCard task={taskJson} rerenderParentComp={rerenderParentComp} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
