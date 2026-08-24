import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider";
import Register from "./Register";

const renderRegister = () =>
  render(
    <AuthProvider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </AuthProvider>
  );

test("يعرض أخطاء الحقول الفارغة في إنشاء الحساب", () => {
  renderRegister();

  fireEvent.click(screen.getByRole("button", { name: "إنشاء الحساب" }));

  expect(screen.getByText("يرجى إدخال الاسم بالكامل")).toBeInTheDocument();
  expect(screen.getByText("يرجى إدخال البريد الإلكتروني")).toBeInTheDocument();
  expect(screen.getByText("يرجى إدخال رقم الجوال")).toBeInTheDocument();
  expect(screen.getByText("يرجى إدخال كلمة المرور")).toBeInTheDocument();
});

test("يوجه رابط تسجيل الدخول إلى صفحة الدخول", () => {
  renderRegister();

  expect(screen.getByRole("link", { name: "تسجيل الدخول" })).toHaveAttribute(
    "href",
    "/auth/login"
  );
});

test("يعرض صورة تعليمية لبداية رحلة الطفل", () => {
  renderRegister();

  expect(
    screen.getByRole("img", {
      name: "معلمة وأطفال يبدأون رحلة تعلم رقمية ممتعة معًا",
    })
  ).toBeInTheDocument();
});
