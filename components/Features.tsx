import Link from "next/link";

export default function FeaturesSection() {
  return (
    <div className="py-8 overflow-hidden">
      <style jsx>{`
        .description {
          margin-bottom: 24px;
          font-family: "FT Polar", sans-serif;
          color: rgba(17, 17, 17, 0.8);
          font-size: 24px;
          line-height: 36px;
          font-weight: 500;
        }
      `}</style>
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h4 className="text-center like-title">A better way remind yourself of your bookmarks</h4>
          <p className="description mx-auto mt-4 max-w-3xl text-center">
            Refine your Twitter Bookmarks experience.
          </p>
        </div>

        <div className="relative mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3
              style={{ fontFamily: "Moranga" }}
              className="text-2xl my-4 font-extrabold text-gray-900 tracking-tight sm:text-3xl"
            >
              Relive your bookmarks
            </h3>
            <p className="description">
              Get one random bookmark daily or a timeline of all your bookmarks.
            </p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <img
              className="relative mx-auto"
              width={490}
              src="https://storytale-public2.b-cdn.net/2021/08/16/7a5516bc-e2aa-4e73-82b7-03e391971344-Folder.png"
              alt=""
            />
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3
                style={{ fontFamily: "Moranga" }}
                className="text-2xl font-extrabold my-4 text-gray-900 tracking-tight sm:text-3xl"
              >
                Search your bookmarks
              </h3>
              <p className="description">
                Search through your bookmarks easily without any hassle.
              </p>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <img
                className="relative mx-auto"
                width={490}
                src="https://storytale-public2.b-cdn.net/2021/08/16/fb9a8efb-fa9a-4f00-9f09-157840508ad9-Searching.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="relative mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3
              style={{ fontFamily: "Moranga" }}
              className="text-2xl my-4 font-extrabold text-gray-900 tracking-tight sm:text-3xl"
            >
              Make your bookmarks public
            </h3>
            <p className="description">
              Make some or all your bookmarks public for others on the shared bookmarks timeline.
              <br />
              Access the bookmarks of others too.
            </p>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <img
              className="relative mx-auto"
              width={490}
              src="https://storytale-public2.b-cdn.net/2021/08/16/aa7d7db5-c6a8-4690-938e-cbb0234af20a-NoConnection.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
