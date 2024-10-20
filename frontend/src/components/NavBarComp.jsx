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
import { useUserStore } from "../stores/userStore"
import ProfileComponent from "./ProfileComponent"

const NavBarComp = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn) || false;

  const menuItems = [
    "Profile",
    "My Tasks",
    "Add Task",
    "Log Out",
  ];

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

      {isLoggedIn && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              My Tasks
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Add Task
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <>
            <ProfileComponent />
          </>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/login" variant="ghost" className="text-lg">
              Login
            </Button>
          </NavbarItem>
        )}

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

export default NavBarComp