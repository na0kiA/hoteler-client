// import { render, screen, cleanup } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import UserDetail from "pages/users/[id]";

// describe("UserDetail", () => {
//   it("アカウント削除ボタンが取得できること", async () => {
//     // const { hotels } = await getAllHotel();
//     // // console.log(hotels);
//     // // render(hotels);
//     render(
//       <UserDetail
//         id={0}
//         name={""}
//         image={""}
//         favorites={{
//           id: 0,
//           hotelName: "",
//           hotelTopImage: "",
//           fiveStarRate: 0,
//         }}
//         reviews={{
//           title: "",
//           content: "",
//           fiveStarRate: 0,
//           helpfulnessesCount: 0,
//           userName: "",
//           userImage: "",
//           createdAt: new Date(),
//         }}
//       />
//     );
//     // screen.debug();
//     expect(screen.getByText("アカウントを削除")).toBeInTheDocument();
//     // expect(screen.getByRole("button")).toHaveTextContent("hello there");
//     // expect(await screen.findByText("カルシファー")).toBeInTheDocument();
//     //   expect(screen.getByText('dummy title 2')).toBeInTheDocument()
//   });
// });
