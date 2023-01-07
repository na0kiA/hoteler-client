import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAllHotel } from "../lib/hotels";
import Home from "pages/index";

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
    // const { hotels } = await getAllHotel();
    // // console.log(hotels);
    // // render(hotels);
    // render(<Home hotels={[]} />);
    // screen.debug();
    // expect(screen.getByText("dummy title 1")).toBeInTheDocument();
    // expect(screen.getByRole("button")).toHaveTextContent("hello there");
    // expect(await screen.findByText("カルシファー")).toBeInTheDocument();
    //   expect(screen.getByText('dummy title 2')).toBeInTheDocument()
  });
});
