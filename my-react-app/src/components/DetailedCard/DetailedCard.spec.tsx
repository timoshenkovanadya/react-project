import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, Mock } from "vitest";
import { fetchDetailed } from "../../api/api";
import { ResponseDeatailedType } from "../../api/api.types";
import DetailedCard from "./DetailedCard";

// Mock the fetchDetailed function
vi.mock("../../api/api", () => ({
  fetchDetailed: vi.fn(),
}));

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

const renderComponent = (detailId: string, page: string) => {
  return render(
    <MemoryRouter initialEntries={[`/detail/${detailId}/page/${page}`]}>
      <Routes>
        <Route path="/detail/:detailId/page/:page" element={<DetailedCard />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("DetailedCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loader initially", () => {
    (fetchDetailed as Mock).mockResolvedValue({
      json: async () => mockData,
    });
    act(() => {
      renderComponent("1", "1");
    });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("fetches and displays detailed data", async () => {
    (fetchDetailed as Mock).mockResolvedValue({
      json: async () => mockData,
    });

    act(() => {
      renderComponent("1", "1");
    });

    await waitFor(() => expect(fetchDetailed).toHaveBeenCalledWith("1"));
    await waitFor(() => {
      expect(screen.getByText("Name: Lion")).toBeInTheDocument();
      expect(screen.getByText("earthAnimal: yes")).toBeInTheDocument();
      expect(screen.getByText("avian: no")).toBeInTheDocument();
      expect(screen.getByText("canine: no")).toBeInTheDocument();
      expect(screen.getByText("feline: yes")).toBeInTheDocument();
    });
  });

  test("navigates back to previous page on close button click", async () => {
    (fetchDetailed as Mock).mockResolvedValue({
      json: async () => mockData,
    });

    act(() => {
      renderComponent("1", "1");
    });

    await waitFor(() => expect(fetchDetailed).toHaveBeenCalledWith("1"));

    const closeButton = screen.getByTestId("close-button");
    act(() => {
      fireEvent.click(closeButton);
    });
    await waitFor(() => {
      expect(window.location.pathname).not.toBe("/detail/1/page/1");
    });
  });
});
