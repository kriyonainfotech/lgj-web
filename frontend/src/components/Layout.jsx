// src/components/Layout.jsx

import ScrollToTopButton from "../utils/ScrollToTopButton";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default Layout;
