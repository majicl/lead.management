import "@testing-library/jest-dom";

import * as React from "react";
import { render, screen } from "@testing-library/react";
import Price from "../../../../src/components/Tradie/Price.jsx";

test("Price", () => {
  const price = "12.00";
  render(<Price price={price} />);
  expect(screen.getByText(price)).toBeInTheDocument();
});
