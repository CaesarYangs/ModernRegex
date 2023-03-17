import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [status, setStatus] = useState<string>("");
  const [apiString, setApiString] = useState<string>("");
  const [serviceKind, setServiceKind] = useState<string>("");
  // const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        apiString: apiString,
        serviceKind: serviceKind,
      },
      (items) => {
        setApiString(items.apiString);
        setServiceKind(items.serviceKind);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        apiString: apiString,
        serviceKind: serviceKind,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        API String:{" "}
        <input
          type="text"
          value={apiString}
          onChange={(event) => setApiString(event.target.value)}
        />
      </div>
      <div>
        Service Kind:{" "}
        <select
          value={serviceKind}
          onChange={(event) => setServiceKind(event.target.value)}
        >
          <option value="teacher">as Regex Teacher</option>
          <option value="helper">as Regex Helper</option>
        </select>
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
