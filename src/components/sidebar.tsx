"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  AlertTriangle,
  Package,
  TrendingUp,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Vista general de KPIs",
  },
  {
    name: "Alertas",
    href: "/alertas",
    icon: AlertTriangle,
    description: "Quiebres y oportunidades",
  },
  {
    name: "Inventario",
    href: "/inventario",
    icon: Package,
    description: "Stock por tienda",
  },
  {
    name: "Ventas",
    href: "/ventas",
    icon: TrendingUp,
    description: "Análisis de sell-out",
  },
  {
    name: "Insights",
    href: "/insights",
    icon: MessageSquare,
    description: "Qué hablar con el comprador",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-border/50 bg-sidebar backdrop-blur-xl flex flex-col">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Image
            src="/rushdata-logo.png"
            alt="RushData"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-semibold text-sm">RushData</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors group",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 truncate">{item.name}</span>
              {isActive && (
                <ChevronRight className="h-3 w-3 opacity-50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground">GALLETAS CRUNCH</p>
          <p>Demo de análisis comercial</p>
        </div>
      </div>
    </aside>
  );
}
