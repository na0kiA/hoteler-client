import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "components/Navbar";
import { AuthContext } from "context/AuthProvider";
import { getNotification } from "lib/notification";
// import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

jest.mock("lib/notification", () => ({
  getNotification: jest.fn(),
}));

const mockResponse = {
  status: 200,
  data: [{}],
};

(getNotification as jest.Mock).mockResolvedValueOnce(mockResponse);

describe("Navbar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("ログインしている場合", () => {
    it("ユーザーのプロフィール画像が表示されること", async () => {
      render(
        <AuthContext.Provider
          value={
            {
              currentUser: {},
              isSignedIn: true,
            } as any
          }
        >
          <Navbar />
        </AuthContext.Provider>
      );
      expect(await screen.findByAltText("アバター")).toBeInTheDocument();
    });
  });

  describe("通知が10件送られてきた場合", () => {
    it("通知用のPCとスマホのバッジが9+になること", async () => {
      render(
        <AuthContext.Provider
          value={
            {
              currentUser: {},
              isSignedIn: true,
              notificationCount: 10,
            } as any
          }
        >
          <Navbar />
        </AuthContext.Provider>
      );
      expect(await screen.findAllByText("9+")).toHaveLength(2);
    });

    // it("通知用バッジを押下すると通知がなくなること", async () => {
    //   const user = userEvent.setup();

    //   render(
    //     <AuthContext.Provider
    //       value={
    //         {
    //           currentUser: {},
    //           isSignedIn: true,
    //           notificationCount: 10,
    //         } as any
    //       }
    //     >
    //       <Navbar />
    //     </AuthContext.Provider>
    //   );
    //   await user.click(screen.getByTestId("notification-button-by-pc"));
    //   expect(await screen.findByText("9+")).toBeNull();
    // });
  });

  describe("通知がない場合", () => {
    it("通知用のバッジの数字が無いこと", async () => {
      render(
        <AuthContext.Provider
          value={
            {
              currentUser: {},
              isSignedIn: true,
            } as any
          }
        >
          <Navbar />
        </AuthContext.Provider>
      );
      expect(screen.queryByText("9+")).toBeNull();
    });
  });
});
