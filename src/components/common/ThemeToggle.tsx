"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!theme) {
    setTheme("dark");
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="Theme-Switch"
        checked={theme === "dark"}
        onClick={handleToggle}
      />
      <Label htmlFor="Theme-Switch">
        {theme === "dark" ? "Dark" : "Light"} Mode
      </Label>
    </div>
  );
}
