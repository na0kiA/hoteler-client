import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "pages/index";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/hotels`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "カルシファー",
          fullAddress: "新潟県諒区3の17",
          full: false,
          averageRating: "4.0",
          reviewsCount: 9,
          hotelImages: "no image",
          restRates: "休憩は営業時間外です",
          stayRates: {
            plan: "素泊まり",
            rate: 10980,
            startTime: 0,
            endTime: 9,
          },
          id: 3,
        },
        {
          name: "ベルリーニ",
          fullAddress: "宮崎県原田市6の42",
          full: false,
          averageRating: "0.0",
          reviewsCount: 0,
          hotelImages: "no image",
          restRates: { plan: "休憩90分", rate: 5980, startTime: 6, endTime: 0 },
          stayRates: {
            plan: "宿泊1部",
            rate: 12980,
            startTime: 22,
            endTime: 11,
          },
          id: 9,
        },
      ])
    );
  }),
];

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("Home", () => {
  it("ホームページが取得できること", async () => {
    const hotels = {
      name: "ベルリーニ",
      fullAddress: "宮崎県原田市6の42",
      full: false,
      averageRating: 0,
      reviewsCount: 0,
      hotelImages: [{ id: 1, fileUrl: "", key: "" }],
      restRates: {
        plan: "休憩90分",
        rate: 5980,
        startTime: 6,
        endTime: 0,
        day: "月",
        service: "休憩",
        id: 1,
        dayId: 1,
        serviceId: 1,
      },
      stayRates: {
        plan: "宿泊1部",
        rate: 12980,
        startTime: 22,
        endTime: 11,
        day: "月",
        service: "宿泊",
        id: 2,
        dayId: 1,
        serviceId: 2,
      },
      id: 9,
    };

    render(<Home hotels={[hotels]} />);
    expect(await screen.findByText("ベルリーニ")).toBeInTheDocument();
  });
});
