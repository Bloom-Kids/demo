import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider";
import Login from "./Login";

const renderLogin = () =>
  render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );

test("يعرض أخطاء الحقول الفارغة في تسجيل الدخول", () => {
  renderLogin();

  fireEvent.click(screen.getByRole("button", { name: "تسجيل الدخول" }));

  expect(screen.getByText("يرجى إدخال البريد الإلكتروني")).toBeInTheDocument();
  expect(screen.getByText("يرجى إدخال كلمة المرور")).toBeInTheDocument();
});

test("يوجه رابط إنشاء الحساب إلى صفحة التسجيل", () => {
  renderLogin();

  expect(screen.getByRole("link", { name: "إنشاء حساب جديد" })).toHaveAttribute(
    "href",
    "/auth/register"
  );
});

test("يعرض صورة تعليمية للأطفال والمعلمة", () => {
  renderLogin();

  expect(
    screen.getByRole("img", {
      name: "أطفال يتعلمون مع معلمتهم باستخدام نشاط رقمي تفاعلي",
    })
  ).toBeInTheDocument();
});

test("يمكن إظهار كلمة المرور وإخفاؤها", () => {
  renderLogin();

  const passwordInput = screen.getByLabelText("كلمة المرور");
  expect(passwordInput).toHaveAttribute("type", "password");

  fireEvent.click(screen.getByRole("button", { name: "إظهار كلمة المرور" }));
  expect(passwordInput).toHaveAttribute("type", "text");

  fireEvent.click(screen.getByRole("button", { name: "إخفاء كلمة المرور" }));
  expect(passwordInput).toHaveAttribute("type", "password");
});
