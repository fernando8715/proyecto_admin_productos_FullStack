import { NavLink, Outlet } from "react-router-dom"

export const Layout = () => {
    return (
        <>
            <header className="bg-slate-800">
                <div className="mx-auto max-w-6xl py-8">
                    <h1 className="text-white font-extrabold text-4xl">Administración de productos</h1>
                </div>
                <div className="bg-amber-500 flex gap-3 ">
                    <NavLink to="productos">Products</NavLink>
                    <NavLink to="productos/nuevo">Home</NavLink>
                </div>
            </header>

            <main className="mx-auto max-w-6xl mt-6 p-10 bg-white shadow">
                <Outlet />
            </main>
        </>
    )
}
