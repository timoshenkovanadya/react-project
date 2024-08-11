import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Animal } from "../../api/api.types";
import { RootState } from "../../store/store";
import { CardsBlock } from "./CardsBlock";

// Mock data for testing
export const mockData: Animal[] = [
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

const mockStore = configureStore<Pick<RootState, "page" | "adapter">>([]);

// Utility function to render the component
const renderComponent = (cards: Animal[], isFetching: boolean) => {
  const store = mockStore({
    adapter: { ids: [], entities: {} },
    page: {
      cards,
      isFetching,
      maxPage: "1",
    },
  });
  return render(
    <Router>
      <Provider store={store}>
        <CardsBlock />
      </Provider>
    </Router>,
  );
};

describe("CardsBlock", () => {
  test("renders loader when isFetching is true", () => {
    renderComponent([], true);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders data when isFetching is false", async () => {
    renderComponent(mockData, false);
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    expect(screen.getByText('Name: "Lion"')).toBeInTheDocument();
    expect(screen.getByText('Name: "Eagle"')).toBeInTheDocument();
  });

  test("renders correct links for each data item", () => {
    renderComponent(mockData, false);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockData.length);
    expect(links[0]).toHaveAttribute("href", "/detail/1");
    expect(links[1]).toHaveAttribute("href", "/detail/2");
  });

  test("each card displays correct animal information", () => {
    renderComponent(mockData, false);
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
