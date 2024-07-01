"use client";
import HeaderComp from "./Components/HeaderComp";
import ResumeWorkspace from "./Containers/ResumeWorkspace";
import { ContactDetailsProvider } from "./Context/ContactDetailsContext";
import { SectionsProvider } from "./Context/SectionsContext";

export default function Home() {
  return (
    <div>
      <SectionsProvider>
        <ContactDetailsProvider>
          <HeaderComp title="Resume Builder" />
          <ResumeWorkspace />
        </ContactDetailsProvider>
      </SectionsProvider>
    </div>
  );
}
