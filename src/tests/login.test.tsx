import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import LoginForm from "../components/auth/LoginForm";
import renderer from "react-test-renderer";

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

//Snapshot Testing
it("LoginForm should match snapshots", () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
