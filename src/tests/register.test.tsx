import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import RegisterForm from "../components/auth/RegisterForm";
import renderer from "react-test-renderer";
import { hasInputValue } from "./utils";
import userEvent from "@testing-library/user-event";
import { SuccessModal } from "@/components/modals/SuccessModal";

test("Input fields should render", async () => {
  const { getByTestId } = render(<RegisterForm />);

  const fullname = getByTestId("fullname");
  const email = getByTestId("email");
  const password = getByTestId("password");

  expect(fullname).to.exist;
  expect(email).to.exist;
  expect(password).to.exist;
});

test("The CTA must render", async () => {
  const { getByText } = render(<RegisterForm />);
  const signinCTA = getByText("Signup");
  expect(signinCTA).to.exist;
});

test("CTA action", async () => {
  const { getByTestId } = render(<RegisterForm />);
  render(<SuccessModal />);

  const fullName = getByTestId("fullname");
  const email = getByTestId("email");
  const password = getByTestId("password");

  const testFullName = "Lucky Pius";
  const testEmail = "lucddkypiussdd5cx0@ss.com";
  const testPassword = "MyShelf019287";

  // Set values for fullName, email and password fields
  fireEvent.change(fullName, { target: { value: testFullName } });
  fireEvent.change(email, { target: { value: testEmail } });
  fireEvent.change(password, { target: { value: testPassword } });

  expect(hasInputValue(fullName, testFullName)).toBe(true);
  expect(hasInputValue(email, testEmail)).toBe(true);
  expect(hasInputValue(password, testPassword)).toBe(true);

  const signupCTA = getByTestId("signup-cta");
  expect(signupCTA).to.exist;

  await userEvent.click(signupCTA);
  // You should be able to see the success modal after submission
  const successTexts = screen.getAllByText("Success");
  expect(successTexts.length).to.be.greaterThan(0);
});

test("Should be able to see the info text", async () => {
  const { getByTestId } = render(<RegisterForm />);
  const info = getByTestId("infotext");
  expect(info).to.exist;
});

//Snapshot Testing
it("RegisterForm should match snapshots", () => {
  const tree = renderer.create(<RegisterForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
