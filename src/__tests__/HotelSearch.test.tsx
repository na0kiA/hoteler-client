import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "components/Navbar";
import { AuthContext } from "context/AuthProvider";
import userEvent from "@testing-library/user-event";
import HotelSearch from "pages/[search]";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("HotelSearch", () => {
  describe("検索ができる場合", () => {
    it("該当するホテルが出力されること", () => {
      render(<HotelSearch searchedHotelList={[]} />);
      expect(screen.getByText("アバター")).toBeInTheDocument();
    });
  });
});
