import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
// import configureStore from "redux-mock-store";
import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { ResponseDeatailedType } from "../../api/api.types";
import DetailedCard from "./DetailedCard";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { cardsService } from "../../api/cardsService";
// import { Middleware } from "@reduxjs/toolkit";

// Mock the fetchDetailed function
const mockData: ResponseDeatailedType = {
  animal: {
    uid: "1",
    name: "Lion",
    earthAnimal: true,
    earthInsect: false,
    avian: false,
    canine: false,
    feline: true,
  },
};

export const restHandlers = [
  http.get("https://stapi.co/api/v1/rest/animal?uid=1", () => {
    return HttpResponse.json(mockData);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

cardsService.middleware;

// const mockStore = configureStore<Pick<RootState, "detailed" | "adapter">>([
//   cardsService.middleware,
// ]);

const renderComponent = (detailId: string, page: string) => {
  // const store = mockStore({
  //   adapter: { ids: [], entities: {} },
  //   detailed: { card: null },
  // });
  return render(
    <MemoryRouter initialEntries={[`/${page}/${detailId}`]}>
      <Provider store={store}>
        <Routes>
          <Route
            path="/:detailId/:page"
            element={<DetailedCard />}
          />
        </Routes>
      </Provider>
    </MemoryRouter>,
  );
};

describe("DetailedCard", () => {
  beforeEach(() => {});

  test("renders loader initially", () => {
    // (fetchDetailed as Mock).mockResolvedValue({
    //   json: async () => mockData,
    // });
    act(() => {
      renderComponent("1", "1");
    });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("fetches and displays detailed data", async () => {
    // (fetchDetailed as Mock).mockResolvedValue({
    //   json: async () => mockData,
    // });

    act(() => {
      renderComponent("1", "1");
    });

    // await waitFor(() => expect(fetchDetailed).toHaveBeenCalledWith("1"));
    await waitFor(() => {
      expect(screen.getByText("Name: Lion")).toBeInTheDocument();
      expect(screen.getByText("earthAnimal: yes")).toBeInTheDocument();
      expect(screen.getByText("avian: no")).toBeInTheDocument();
      expect(screen.getByText("canine: no")).toBeInTheDocument();
      expect(screen.getByText("feline: yes")).toBeInTheDocument();
    });
  });

  test("navigates back to previous page on close button click", async () => {
    // (fetchDetailed as Mock).mockResolvedValue({
    //   json: async () => mockData,
    // });

    act(() => {
      renderComponent("1", "1");
    });

    await new Promise((r) => setTimeout(r, 1000));

    const closeButton = screen.getByTestId("close-button");
    act(() => {
      fireEvent.click(closeButton);
    });
    await waitFor(() => {
      expect(window.location.pathname).not.toBe("/detail/1/page/1");
    });
  });
});
