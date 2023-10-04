import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../components/auth/LoginForm";
import renderer from "react-test-renderer";
import { cookieStorageManager } from "@/api";
import userEvent from "@testing-library/user-event";
import { storageKeys } from "@/api/storageKeys";
import { UserData } from "@/types/global-types";
import { hasInputValue } from "./utils";

//NOTE USE THIS TO DEBUG -  screen.debug();

test("Email and password fields should render", async () => {
  const { getByTestId } = render(<LoginForm />);

  const email = getByTestId("email");
  const password = getByTestId("password");

  expect(email).to.exist;
  expect(password).to.exist;
});

test("The CTA must render", async () => {
  const { getByText } = render(<LoginForm />);
  const signinCTA = getByText("Sign in");
  expect(signinCTA).to.exist;
});

test("CTA action", async () => {
  const { getByTestId } = render(<LoginForm />);
  const email = getByTestId("email");
  const password = getByTestId("password");

  const testEmail = "xxxx@ss.com";
  const testPassword = "yourpassword123";

  // Set values for email and password fields
  fireEvent.change(email, { target: { value: testEmail } });
  fireEvent.change(password, { target: { value: testPassword } });

  expect(hasInputValue(email, testEmail)).toBe(true);
  expect(hasInputValue(password, testPassword)).toBe(true);

  const signinCTA = getByTestId("signin-cta");
  expect(signinCTA).to.exist;

  await userEvent.click(signinCTA);

  // User info should be saved to cookie
  const userInfo = cookieStorageManager.getItem<UserData>(storageKeys.user);
  expect(userInfo?.email).toBe(testEmail);
  expect(userInfo?.id).to.be.exist;
});

//Snapshot Testing
it("LoginForm should match snapshots", () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
