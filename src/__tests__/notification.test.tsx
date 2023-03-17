import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "components/Navbar";
import { AuthContext } from "context/AuthProvider";
// import { getNotification } from "lib/notification";
// import axios from "axios";
// import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
// jest.mock("axios", () => ({
//   __esModule: true,
//   default: {
//     create: jest.fn(() => {
//       return {
//         interceptors: {
//           request: { use: jest.fn() },
//           response: { use: jest.fn() },
//         },
//       };
//     }),
//   },
// }));

describe("Navbar", () => {
  const data = {
    allow_password_change: false,
    created_at: "2023-01-02T20:57:51.230+09:00",
    email: "na0ki.9798@gmail.com",
    id: 57,
    image:
      "uploads/hoteler/30872b24-db03-4284-8116-f409abb25e2c/abfc5386ec0749878190541e5a9a069f.png",
    name: "na0ki",
    nickname: "na0ki",
    provider: "email",
    uid: "na0ki.9798@gmail.com",
    updated_at: "2023-02-19T02:37:31.975+09:00",
  };

  describe("ログインしている場合", () => {
    it("ユーザーのプロフィール画像が表示されること", async () => {
      render(
        <AuthContext.Provider
          value={
            {
              currentUser: data,
              isSignedIn: true,
            } as any
          }
        >
          <Navbar />
        </AuthContext.Provider>
      );
      expect(screen.getByAltText("アバター")).toBeInTheDocument();
    });
  });

  // describe("通知が10件送られてきた場合", () => {
  //   it("通知用のバッジが9+になること", async () => {
  //     const accessToken = "testAccessToken";
  //     const clientToken = "testClientToken";
  //     const uid = "testUid";
  //     const response = { data: "testData", status: 200 };
  //     const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue(response);

  //     const result = await getNotification(accessToken, clientToken, uid);

  //     expect(axiosGetSpy).toHaveBeenCalledWith("/notifications", {
  //       headers: {
  //         "access-token": accessToken,
  //         client: clientToken,
  //         uid,
  //       },
  //     });

  //     expect(result).toEqual(response.data);

  //     render(
  //       <AuthContext.Provider
  //         value={
  //           {
  //             currentUser: data,
  //             isSignedIn: true,
  //             notificationCount: 10,
  //           } as any
  //         }
  //       >
  //         <Navbar />
  //       </AuthContext.Provider>
  //     );
  //     expect(screen.getAllByText("9+")).toHaveLength(2);
  //   });
  // });

  // describe("通知がない場合", () => {
  //   it("通知用のバッジが非表示になっていること", async () => {
  //     render(
  //       <AuthContext.Provider
  //         value={
  //           {
  //            @ currentUser: data,
  //             isSignedIn: true,
  //             notificationCount: 0,
  //           } as any
  //         }
  //       >
  //         <Navbar />
  //       </AuthContext.Provider>
  //     );
  //     expect(screen.queryByText("9+")).toBeNull();
  //   });
  // });
});
