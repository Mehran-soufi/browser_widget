import Search from "./Search";
import Shortcut from "./Shortcut";

function SearchCom() {
  return (
    <div className="w-full h-full flex flex-col justify-center lg:items-center items-start gap-2 overflow-x-auto">
      <Search />
      <Shortcut />
    </div>
  );
}

export default SearchCom;
