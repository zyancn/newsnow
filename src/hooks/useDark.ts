import { useMemo } from "react"
import { useMedia, useUpdateEffect } from "react-use"
import { atomWithStorage } from "jotai/utils"
import { useAtom } from "jotai"

export declare type ColorScheme = "dark" | "light" | "auto"

const colorSchemeAtom = atomWithStorage("color-scheme", "auto")
export function useDark() {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom)
  const prefersDarkMode = useMedia("(prefers-color-scheme: dark)")
  const isDark = useMemo(() => colorScheme === "auto" ? prefersDarkMode : colorScheme === "dark", [colorScheme, prefersDarkMode])

  useUpdateEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const setDark = (value: ColorScheme) => {
    setColorScheme(value)
  }

  const toggleDark = () => {
    setColorScheme(isDark ? "light" : "dark")
  }

  return { isDark, setDark, toggleDark }
}
