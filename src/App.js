import Navigation from "./component/navigation.js";
import Menulist from "./component/menulist.js";
import { SideMenuProvider } from "./component/function/sideMenuContext.js";
import { LanguageProvider } from "./component/function/languageContext.js";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/aboutPage.js";
import WorksPage from "./pages/worksPage.js";
import GalleryPageWrapper from "./pages/galleryPageWrapper.js";
import ContactPage from "./pages/contactPage.js";
import Resume from "./pages/resume.js";
import Footer from "./pages/footer.js";
import UCB from "./pages/innerPage/UCB.js";
import HR from "./pages/innerPage/HR.js";
import XDC from "./pages/innerPage/XDC.js";
import PriceAlert from "./pages/innerPage/PriceAlert.js";

function App() {
  return (
    <SideMenuProvider>
      <LanguageProvider>
        <Menulist />
        <Navigation />
        <Routes>
          <Route path="/" element={<AboutPage />}></Route>
          <Route path="/works" element={<WorksPage />}></Route>
          <Route path="/gallery" element={<GalleryPageWrapper />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
          <Route path="/works/UCB" element={<UCB />}></Route>
          <Route path="/works/HR" element={<HR />}></Route>
          <Route path="/works/XDC" element={<XDC />}></Route>
          <Route path="/works/PriceAlert" element={<PriceAlert />}></Route>
        </Routes>
        <Footer />
      </LanguageProvider>
    </SideMenuProvider>
  );
}

export default App;
