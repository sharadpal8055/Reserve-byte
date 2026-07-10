import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <main
        className="
min-h-[calc(100vh-64px)]
bg-gray-50
p-10
"
      >
        {children}
      </main>
    </>
  );
}

export default Layout;
