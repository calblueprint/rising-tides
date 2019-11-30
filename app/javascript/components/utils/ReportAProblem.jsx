import React, { useState, useRef } from "react";

const NOT_SENT = 0;
const SENDING = 1;
const SENT = 2;
const ERR = 3;

function ReportAProblem() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(NOT_SENT);

  const input = useRef(null);
  if (open && status !== SENT && input) {
    input.current.focus();
  }

  if (status === SENT && !open) {
    // Reset the form after they close it
    setStatus(NOT_SENT);
  }

  function submitProblem(e) {
    e.preventDefault();
    if (status === SENDING) {
      return;
    }

    setStatus(SENDING);
    let sessionUrl;
    if (window.FS) {
      FS.event("Reported Problem", {
        problem: input.current.value
      });
      sessionUrl = FS.getCurrentSessionURL();
    }

    fetch("https://rap-forwarder.glitch.me/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: `*Problem*: ${input.current.value}\n*FullStory session*: ${sessionUrl}`
      })
    })
      .then(resp => {
        if (resp.ok) {
          setStatus(SENT);
        } else {
          setStatus(ERR);
        }
      })
      .catch(err => {
        console.error(err);
        setStatus(ERR);
      });
  }

  return (
    <div className="rap__container">
      <div className="rap__btn" onClick={() => setOpen(!open)}>
        <i className={`far fa-flag ${open ? "hidden" : ""}`} />
        <i className={`fas fa-times ${open ? "" : "hidden"}`} />
      </div>
      <div className={`rap__form ${open ? "" : "hidden"}`}>
        {status !== SENT && (
          <form onSubmit={submitProblem}>
            <label htmlFor="problem">Describe the problem</label>
            {status === ERR && (
              <p className="rap__error">
                There was an error sending your form. Try again.
              </p>
            )}
            <textarea
              name="problem"
              ref={input}
              rows="4"
              placeholder="I tried to apply for a project, and..."
            />
            <input
              type="submit"
              value={status === SENDING ? "Sending..." : "Send"}
              disabled={status === SENDING}
            />
          </form>
        )}
        {status === SENT && (
          <div className="rap__success">
            <div className="rap__success-header">
              <i className="fas fa-check-circle"></i>
              <h1>We got it</h1>
            </div>
            <p>
              Our team has received your report and will be looking into the
              issue.
            </p>
          </div>
        )}
      </div>
      <p className="rap__hover-label">Report a problem</p>
    </div>
  );
}

export default ReportAProblem;
