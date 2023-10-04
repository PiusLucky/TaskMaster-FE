import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { TaskModal } from "@/components/modals/TaskModal";
import { hasInputValue } from "./utils";
import userEvent from "@testing-library/user-event";
import { SuccessModal } from "@/components/modals/SuccessModal";

const rerenderParentComp = () => {};

class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
    this.pointerType = props.pointerType || "mouse";
  }
}
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();

test("ADD TASK - user should be able to see the add task modal & make api request when add task buton is clicked", async () => {
  const user = userEvent.setup();
  const {
    queryByTestId: modalQueryByTestId,
    getByTestId,
    findByTestId,
  } = render(<TaskModal isCreate rerenderParentComp={rerenderParentComp} />);
  render(<SuccessModal />);

  //The modal should not show up when the Add New Task button has not been clicked
  const modalContent = modalQueryByTestId("modal-content");
  expect(modalContent).to.not.exist;
  const addNewTaskButton = getByTestId("task-modal-trigger");

  // Click the button
  fireEvent.click(addNewTaskButton);

  // Wait for the modal to appear by using findByTestId
  const createTaskDialog = await findByTestId("modal-content");
  expect(createTaskDialog).to.exist;

  const titleValue = getByTestId("title-input");
  const description = getByTestId("description");

  const testTitle = "New Task";
  const testDescription = "Test description";

  // Set all required inputs
  fireEvent.change(titleValue, { target: { value: testTitle } });
  fireEvent.change(description, { target: { value: testDescription } });

  // Find the button that triggers the dropdown
  const triggerCategory = screen.getByRole("combobox", {
    name: "Category",
  });

  const triggerPriority = screen.getByRole("combobox", {
    name: "Priority",
  });

  await user.click(triggerCategory);
  await user.click(screen.getByRole("option", { name: "Fun" })); //Set Fun as category

  await user.click(triggerPriority);
  await user.click(screen.getByRole("option", { name: "High" })); //Set High as priority

  expect(hasInputValue(titleValue, testTitle)).toBe(true);
  expect(hasInputValue(description, testDescription)).toBe(true);

  const submitButton = getByTestId("submit");
  expect(submitButton).to.exist;

  submitButton.click();

  // You should be able to see the success modal after submission
  const successTexts = await screen.findAllByText("Success");
  expect(successTexts.length).to.be.greaterThan(0);
});



test("UPDATE TASK - user should be able to see the update task modal & make api request when the pencil icon is clicked", async () => {
    const user = userEvent.setup();
    const {
      queryByTestId: modalQueryByTestId,
      getByTestId,
      findByTestId,
    } = render(<TaskModal isCreate={false} rerenderParentComp={rerenderParentComp} />);
    render(<SuccessModal />);
  
    //The modal should not show up when the Edit button has not been clicked
    const modalContent = modalQueryByTestId("modal-content");
    expect(modalContent).to.not.exist;
    const updateTaskButton = getByTestId("update-task-modal-trigger");
  
    // Click the button
    fireEvent.click(updateTaskButton);
  
    // Wait for the modal to appear by using findByTestId
    const createTaskDialog = await findByTestId("modal-content");
    expect(createTaskDialog).to.exist;
  
    // Should be able to create task
    const titleValue = getByTestId("title-input");
    const description = getByTestId("description");
  
    const testTitle = "New Task";
    const testDescription = "Test description";
  
    // Set all required inputs
    fireEvent.change(titleValue, { target: { value: testTitle } });
    fireEvent.change(description, { target: { value: testDescription } });
  
    const triggerCategory = screen.getByRole("combobox", {
      name: "Category",
    });
  
    const triggerPriority = screen.getByRole("combobox", {
      name: "Priority",
    });
  
    await user.click(triggerCategory);
    await user.click(screen.getByRole("option", { name: "Fun" })); //Set Fun as category
  
    await user.click(triggerPriority);
    await user.click(screen.getByRole("option", { name: "High" })); //Set High as priority
  
    expect(hasInputValue(titleValue, testTitle)).toBe(true);
    expect(hasInputValue(description, testDescription)).toBe(true);
  
    const submitButton = getByTestId("submit");
    expect(submitButton).to.exist;
  
    submitButton.click();
  
    // You should be able to see the success modal after submission
    const successTexts = await screen.findAllByText("Success");
    expect(successTexts.length).to.be.greaterThan(0);
  });

it("Should match snapshots", () => {
  const tree = renderer
    .create(<TaskModal isCreate rerenderParentComp={rerenderParentComp} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
