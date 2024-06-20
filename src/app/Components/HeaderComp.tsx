type HeaderCompProps = {
  title: String;
};

const HeaderComp: React.FC<HeaderCompProps> = ({ title }) => {
  return (
    <div className="header__container">
      <header className="bg-blue-500 text-white py-4">
        <div className="header__txt">{title}</div>
      </header>
    </div>
  );
};

export default HeaderComp;
