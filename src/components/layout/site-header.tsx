"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BoxIcon, CodeIcon } from "lucide-react"

import { navItems } from "@/config/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-4">
        <MobileNav />

        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BoxIcon className="size-5" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="소스 코드 저장소"
            render={
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <CodeIcon className="size-4" />
              </a>
            }
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
