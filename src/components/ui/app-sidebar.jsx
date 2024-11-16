import { cn } from "../../lib/utils"

import { GalleryVerticalEnd, LineChart, PackageSearch, LayoutGrid, BarChart3, ShieldCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutGrid,
          isActive: true,
        },
        {
          title: "Inventory",
          url: "#",
          icon: PackageSearch,
          isActive: false
        },
        {
          title: "Sales",
          url: "#",
          icon: BarChart3,
          isActive: false
        },
        {
          title: "Analytics",
          url: "#",
          icon: LineChart,
          isActive: false
        },
        {
          title: "Permissions",
          url: "#",
          icon: ShieldCheck,
          isActive: false
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Vendorlope</span>
                    <span className="">v1.0.0</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild 
                      isActive={item.isActive} 
                      className={cn(
                        "text-base py-6 px-4 w-full justify-start transition-all duration-150",

                        // Override the default active state colors
                        "data-[active=true]:bg-teal-300 data-[active=true]:text-black hover:bg-neutral-200",
                        "[&_svg]:!w-6 [&_svg]:!h-6",

                        // Explicitly set styles for collapsed state
                        "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
                      )}
                      >
                      <a href={item.url} className="flex w-full items-center group-data-[collapsible=icon]:justify-center">
                        <item.icon className="group-data-[collapsible=icon]:mx-auto" />
                        <span className="ml-1 group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
