import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBlock from "./SearchBlock";

const mockSearchDataHandler = vitest.fn();

const renderComponent = () => {
  render(
    <Router>
      <SearchBlock />
    </Router>,
  );
};

describe("SearchBlock", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("renders search block correctly", () => {
    renderComponent();
    expect(
      screen.getByText(
        "Everything you want to know about animals from star tracks",
      ),
    ).toBe;
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /throw error/i }),
    ).toBeInTheDocument();
  });

  test("handles input change", async () => {
    renderComponent();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    expect(input).toHaveValue("test");
  });

  test("handles form submission", async () => {
    renderComponent();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(mockSearchDataHandler).toHaveBeenCalled();
  });

  test("disables input and button when isFetching is true", () => {
    renderComponent();
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });
});
