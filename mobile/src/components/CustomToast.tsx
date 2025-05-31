import React from "react";
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";

type Props = {
  id: string;
  title: string;
  message: string;
  action: "error" | "warning" | "success" | "info" | "muted"
}

export default function CustomToast({ id, message, title, action }: Props) {
  return (
    <Toast nativeID={id} action={action} variant="solid">
      <ToastTitle className="text-xl font-heading">{title}</ToastTitle>
      <ToastDescription>{message}</ToastDescription>
    </Toast>
  );
}
