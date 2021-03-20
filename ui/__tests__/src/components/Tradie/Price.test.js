import "@testing-library/jest-dom";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Price from "../../../../src/components/Tradie/price.jsx";

afterAll(cleanup);
test("<Price />", () => {
  const price = "12.00";
  const label = "Lead";
  render(<Price price={price} label={label} />);
  expect(screen.getByText(price)).toBeInTheDocument();
  expect(screen.getByText(label)).toBeInTheDocument();
});
