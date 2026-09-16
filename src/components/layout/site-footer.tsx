import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground flex flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p>Next.js · Tailwind CSS v4 · shadcn/ui</p>
      </div>
    </footer>
  )
}
