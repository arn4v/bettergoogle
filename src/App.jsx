import * as React from "react";

function App() {
  const [state, setState] = React.useState({
    fromUrls: "",
    allInTitle: "",
    inUrl: "",
    exactTerms: "",
    exactTermsOR: "",
    dateBefore: "",
    dateAfter: "",
  });

  const onChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <main className="min-h-screen w-screen overflow-x-hidden flex flex-col items-center justify-start py-12 bg-gray-900">
      <div className="font-bold text-3xl text-white leading-loose ml-8 mr-auto lg:mr-0 lg:ml-0">
        Better Google
      </div>
      <form
        className="w-full lg:w-3/5 px-8 lg:px-0 mt-6 flex flex-col gap-8"
        onSubmit={(e) => {
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
        }}
      >
        <div className="input-group">
          <label htmlFor="fromUrls">
            From URLs (Separate using comma <code>,</code>)
          </label>
          <input id="fromUrls" onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="exactTerms">
            Exact terms (Separate using comma <code>,</code>)
          </label>
          <input id="exactTerms" onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="exactTermsOr">
            Exact terms (OR) - One or the other term - (Separate using comma{" "}
            <code>,</code>)
          </label>
          <input id="exactTermsOr" onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="allInTitle">All In Title</label>
          <input id="allInTitle" onChange={onChange} />
        </div>
        <div className="input-group">
          <label>
            In URL (Separate using comma <code>,</code>)
          </label>
          <input id="inUrl" onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="dateBefore">Date BEFORE</label>
          <span>
            Format: YYYY-MM-DD. <br />
            For example: 2000-03-28
          </span>
          <input id="dateBefore" onChange={onChange} />
        </div>
        <div className="input-group">
          <label htmlFor="dateAfter">Date AFTER</label>
          <span>
            Format: YYYY-MM-DD. <br />
            For example: 2000-03-28
          </span>
          <input id="dateAfter" onChange={onChange} />
        </div>
        <div className="w-full space-x-8 flex items-center justify-between mt-4">
          <div></div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;
