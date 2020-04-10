import React from "react";
import {
   render,
   cleanup,
   fireEvent,
   RenderWithSpiesResult,
} from "../test-utils";
import "@testing-library/jest-dom/extend-expect";

import DarkMode from "../views/_shared/DarkMode";
afterEach(cleanup);

describe("DarkMode Component Tests", () => {
   test("It renders correctly", (): void => {
      const { container }: RenderWithSpiesResult = render(<DarkMode />);
      expect(container.innerHTML).toMatch(/Click for Night Mode/);
   });

   test("It updates darkmode context onChange ", (): void => {
      const {
         container,
         mockSpies: { setDarkMode },
      }: RenderWithSpiesResult = render(<DarkMode />);

      const darkMode: HTMLInputElement | null = container.querySelector(
         ".darkMode input"
      );
      expect(darkMode).toBeDefined();
      if (darkMode) {
         expect(darkMode.checked).toBe(false);
         expect(setDarkMode).not.toHaveBeenCalled();
         fireEvent.click(darkMode, { target: { value: true } });
         expect(setDarkMode).toHaveBeenCalledWith(true);
         expect(darkMode.checked).toBe(true);
      }
   });
});
