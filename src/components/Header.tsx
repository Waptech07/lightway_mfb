import { MdNotifications } from "react-icons/md";

const Header = ({ header, detail }: { header: string; detail: string }) => {
  return (
    <header className="font-sf-pro flex text-left justify-between items-center mb-10">
      <div>
        <h1 className="text-3xl font-bold mb-2 ">{header}</h1>
        <p className="text-muted-foreground text-sm font-medium">{detail}</p>
      </div>
      <div className="flex items-center gap-1">
        <div className="relative h-8 w-8">
          <MdNotifications className="text-muted-foreground h-[inherit] w-[inherit]" />
          <div className="bg-red-500 absolute top-1 right-1 h-2 w-2 rounded-full"></div>
        </div>
        <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white">
          <p className="font-semibold text-md">EG</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
