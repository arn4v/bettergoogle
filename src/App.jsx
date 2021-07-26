import * as React from "react";

function App() {
  const onSubmit = (e) => {
    e.preventDefault();
    const state = Array.from(e.target.elements)
      .filter((item) => {
        return item.tagName === "INPUT";
      })
      .reduce((acc, item) => ({ ...acc, [item.id]: item.value }), {});
    const baseUrl = "https://www.google.com/search?q=";
    const params = Object.entries(state).reduce((acc, [title, value]) => {
      console.log(title, value);
      if (value.length === 0) return acc;

      let parsed;

      switch (title) {
        case "fromUrls": {
          if (value.includes(",")) {
            value.split(",").forEach((item) => {
              parsed += `site:${item} `;
            });
          } else {
            parsed = `site:${value}`;
          }
          break;
        }
        case "allInTitle": {
          parsed = "allintitle:" + value;
          break;
        }
        case "dateAfter": {
          parsed = "after:" + value;
          break;
        }
        case "dateBefore": {
          parsed = "before:" + value;
          break;
        }
        case "exactTerms": {
          parsed = value
            .split(",")
            .map((item) => `"${item}"`)
            .join(" ");
          break;
        }
        case "exactTermsOr": {
          parsed =
            "(" +
            value
              .split(",")
              .map((item) => `"${item}"`)
              .join(" OR ") +
            ")";
          break;
        }
        default: {
          break;
        }
      }
      acc.push(parsed.trim());
      return acc;
    }, []);
    const url = baseUrl + encodeURIComponent(params.join(" "));
    window.open(url);
  };

  return (
    <main className="min-h-screen w-screen overflow-x-hidden flex flex-col items-center justify-start py-8 bg-gray-900">
      <div className="font-bold text-3xl text-white leading-loose ml-8 mr-auto lg:mr-0 lg:ml-0">
        Better Google
      </div>
      <form
        className="w-full lg:w-3/5 px-8 lg:px-0 mt-6 flex flex-col gap-8"
        onSubmit={onSubmit}
      >
        <div className="input-group">
          <label htmlFor="fromUrls">
            Filter for specific websites (Separate using comma <code>,</code>)
          </label>
          <span>
            Example: <code>https://nfx.com,firstround.com</code>
            <br />
            Note: http/s is optional
          </span>
          <input id="fromUrls" />
        </div>
        <div className="input-group">
          <label htmlFor="exactTerms">
            Exact terms (Separate using comma <code>,</code>)
          </label>
          <input id="exactTerms" />
        </div>
        <div className="input-group">
          <label htmlFor="exactTermsOr">
            Exact terms (OR) - One or the other term - (Separate using comma{" "}
            <code>,</code>)
          </label>
          <input id="exactTermsOr" />
        </div>
        <div className="input-group">
          <label htmlFor="allInTitle">All In Title</label>
          <input id="allInTitle" />
        </div>
        <div className="input-group">
          <label>
            In URL (Separate using comma <code>,</code>)
          </label>
          <input id="inUrl" />
        </div>
        <div className="input-group">
          <label htmlFor="dateBefore">Date BEFORE</label>
          <span>
            Format: YYYY-MM-DD. <br />
            Example: <code>2000-03-28</code>
          </span>
          <input id="dateBefore" />
        </div>
        <div className="input-group">
          <label htmlFor="dateAfter">Date AFTER</label>
          <span>
            Format: YYYY-MM-DD. <br />
            Example: <code>2000-03-28</code>
          </span>
          <input id="dateAfter" />
        </div>
        <div className="w-full space-x-8 flex items-center justify-between mt-4">
          <div></div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </div>
      </form>
      <div className="text-white text-lg font-medium">
        Built by{" "}
        <a
          className="text-cyan-300 hover:text-cyan-400 transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://arnavgosain.com"
        >
          @arn4v
        </a>
      </div>
    </main>
  );
}

export default App;
