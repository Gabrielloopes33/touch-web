export function HamsterLoader() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="wheel-and-hamster" aria-label="Orange and tan hamster running in a metal wheel" role="img">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
}
