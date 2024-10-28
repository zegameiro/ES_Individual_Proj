import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react"
import { useState } from "react"

import { LogoHorizontal } from "../assets"
import ProfileComponent from "./ProfileComponent"
import { useUserStore } from "../stores/userStore"

const HorizontalNavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "My Tasks",
    "Log Out",
  ];

  const isLoggedIn = useUserStore((state) => state.isLoggedIn) || false;

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isBlurred>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <img src={LogoHorizontal} alt="Logo Image" width={200} />
          </Link>
        </NavbarBrand>
      </NavbarContent>


      <NavbarContent justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            <ProfileComponent />
          ) : (
            <Button as={Link} color="primary" href="/login" variant="ghost" className="text-lg">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default HorizontalNavBar