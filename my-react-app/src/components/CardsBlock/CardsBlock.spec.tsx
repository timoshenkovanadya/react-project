import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Animal } from "../../api/api.types";
import { CardsBlock } from "./CardsBlock";
import { CardsBlockPropsType } from "./cardsBlock.types";

// Mock data for testing
const mockData: Animal[] = [
  {
    uid: "1",
    name: "Lion",
    earthAnimal: false,
    earthInsect: false,
    avian: false,
    canine: true,
    feline: true,
  },
  {
    uid: "2",
    name: "Eagle",
    earthAnimal: true,
    earthInsect: false,
    avian: true,
    canine: false,
    feline: false,
  },
];

// Utility function to render the component
const renderComponent = (props: Partial<CardsBlockPropsType> = {}) => {
  const defaultProps: CardsBlockPropsType = {
    data: [],
    isFetching: false,
  };
  return render(
    <Router>
      <CardsBlock {...defaultProps} {...props} />
    </Router>,
  );
};

describe("CardsBlock", () => {
  test("renders loader when isFetching is true", () => {
    renderComponent({ isFetching: true });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders data when isFetching is false", () => {
    renderComponent({ isFetching: false, data: mockData });
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText('Name: "Lion"')).toBeInTheDocument();
    expect(screen.getByText('Name: "Eagle"')).toBeInTheDocument();
  });

  test("renders correct links for each data item", () => {
    renderComponent({ isFetching: false, data: mockData });
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockData.length);
    expect(links[0]).toHaveAttribute("href", "/detail/1");
    expect(links[1]).toHaveAttribute("href", "/detail/2");
  });

  test("each card displays correct animal information", () => {
    renderComponent({ isFetching: false, data: mockData });
    expect(screen.getByText('Name: "Lion"')).toBeInTheDocument();
    expect(screen.getByText("earthAnimal: yes")).toBeInTheDocument();
    expect(screen.getByText("avian: no")).toBeInTheDocument();
    expect(screen.getByText("canine: no")).toBeInTheDocument();
    expect(screen.getByText("feline: yes")).toBeInTheDocument();

    expect(screen.getByText('Name: "Eagle"')).toBeInTheDocument();
    expect(screen.getByText("earthAnimal: yes")).toBeInTheDocument();
    expect(screen.getByText("avian: yes")).toBeInTheDocument();
    expect(screen.getByText("canine: no")).toBeInTheDocument();
    expect(screen.getByText("feline: no")).toBeInTheDocument();
  });
});
