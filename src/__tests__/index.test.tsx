import { render, screen } from "@testing-library/react";
import Home from "pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("表示されること", () => {
    render(<Home hotels={[]} />);

    expect(screen.getByText("休憩")).toBeTruthy();
  });
});
