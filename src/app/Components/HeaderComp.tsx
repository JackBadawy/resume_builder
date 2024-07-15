type HeaderCompProps = {
  acronym: string;
  subheading?: string;
  fullAcronymName: string;
};

const HeaderComp: React.FC<HeaderCompProps> = ({
  acronym,
  subheading,
  fullAcronymName,
}) => {
  const fullNameArr: Array<string> = fullAcronymName.split(" ");
  return (
    <div className="header__container">
      <header className=" text-white py-4">
        <div id="headerMainCont">
          <div className="flex gap-4 ml-24 " id="headerLogoCont">
            <div id="acrSubCont" className="flex flex-col ">
              <p className="text-bws  text-8xl font-extrabold">{acronym}</p>
              <p className="text-center text-2xl text-zinc-900 font-mono font-semibold">
                {subheading}
              </p>
            </div>
            <div
              className="flex flex-col justify-center text-4xl text-zinc-900 font-serif font-semibold"
              id="acrFullCont"
            >
              {fullNameArr.map((word, index) => (
                <p key={index}>{word}</p>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComp;
