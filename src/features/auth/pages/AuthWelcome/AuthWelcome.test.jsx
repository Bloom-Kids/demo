import { render, screen } from "@testing-library/react";
import AuthWelcome from "./AuthWelcome";

test("تعرض الواجهة الرئيسية روابط الدخول وإنشاء الحساب", () => {
  render(<AuthWelcome />);

  expect(screen.getByRole("link", { name: "تسجيل الدخول" })).toHaveAttribute(
    "href",
    "/auth/login"
  );
  expect(screen.getByRole("link", { name: "إنشاء حساب" })).toHaveAttribute(
    "href",
    "/auth/register"
  );
});
