import NavBarComp from "../components/NavBarComp"

const Layout = ({ children }) => {
  return (
    <main className="flex flex-col">
        <NavBarComp />
        <section className="px-[10vw] py-[4vh] text-text">
            {children}
        </section>
    </main>
  )
}

export default Layout