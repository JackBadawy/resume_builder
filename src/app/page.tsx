import HeaderComp from "./Components/HeaderComp";
import ResumeWorkspace from "./Components/ResumeWorkspace";

export default function Home() {
  return (
    <div>
      <HeaderComp title="Resume Builder" />
      <ResumeWorkspace />
    </div>
  );
}
