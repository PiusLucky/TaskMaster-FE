import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import RegisterForm from "../components/auth/RegisterForm";
import renderer from "react-test-renderer";

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
